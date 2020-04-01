const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const signale = require('signale');

const dbMiddleware = require('./dbMiddleware');
const { insertOne, getOne } = require('./request/repository');
const { sendRequestConfirmation } = require('./toolbox/mailjet');

const { getGlobalStats } = require('./stat/repository');

const app = new Koa();
const router = new Router();

app.use(dbMiddleware);

const { mtime } = fs.statSync(path.resolve(__dirname, './views/index.ejs'));

const initContextState = ctx => {
    ctx.state.errors = {};
    ctx.state.internalError = false;
    ctx.state.request = {};
    ctx.state.success = false;
    ctx.state.stats = {};
};

const getStats = async dbClient => {
    const { globalStats } = await getGlobalStats({
        client: dbClient
    });
    if (globalStats && globalStats.length) {
        return globalStats[0];
    } else {
        throw new Error('Unable to get stats from db');
    }
};

const renderCachedHomepage = async ctx => {
    ctx.set('ETag', `"${mtime.getTime().toString()}"`);

    if (ctx.fresh) {
        ctx.status = 304;
        return;
    }

    initContextState(ctx);
    try {
        ctx.state.stats = await getStats(ctx.state.db);
    } catch (error) {
        signale.error(error);
    }
    return ctx.render('index.ejs');
};

router.get('/', renderCachedHomepage);

const parseRequest = ({
    mask_small_size_quantity,
    mask_large_size_quantity,
    forecast_quantity,
    forecast_days,
    ...body
}) => ({
    ...body,
    mask_small_size_quantity: parseInt(mask_small_size_quantity, 10),
    mask_large_size_quantity: parseInt(mask_large_size_quantity, 10),
    forecast_quantity: parseInt(forecast_quantity, 10),
    forecast_days: parseInt(forecast_days, 10)
});

const validate = ({
    requester_type,
    requester_other_type,
    mask_small_size_quantity,
    mask_large_size_quantity
}) => {
    const errors = {};

    if (!requester_type) {
        errors.requester_type =
            'Veuillez choisir un type de numéro professionnel de santé';
    }

    if (
        requester_type === 'other' &&
        !requester_other_type &&
        requester_other_type.trim() === ''
    ) {
        errors.requester_type =
            'Veuillez préciser le type de numéro de professionnel de santé';
    }

    if (!mask_small_size_quantity && !mask_large_size_quantity) {
        errors.mask_small_size_quantity =
            'La commande doit comporter au moins 5 masques pour être valide';
        errors.mask_large_size_quantity =
            'La commande doit comporter au moins 5 masques pour être valide';
    }

    if (mask_small_size_quantity && mask_small_size_quantity < 5) {
        errors.mask_small_size_quantity =
            'La commande doit comporter au moins 5 masques pour être valide';
    }

    if (mask_large_size_quantity && mask_large_size_quantity < 5) {
        errors.mask_large_size_quantity =
            'La commande doit comporter au moins 5 masques pour être valide';
    }

    if (mask_small_size_quantity + mask_large_size_quantity > 150) {
        errors.mask_small_size_quantity =
            'La commande doit comporter au maximum 150 masques pour être valide';
        errors.mask_large_size_quantity =
            'La commande doit comporter au maximum 150 masques pour être valide';
    }

    return errors;
};

router.post('/', async ctx => {
    initContextState(ctx);

    if (!ctx.request.body) {
        ctx.status = 400;
        return renderCachedHomepage(ctx);
    }

    const request = parseRequest(ctx.request.body);
    const errors = validate(request);

    if (errors && Object.keys(errors).length > 0) {
        ctx.status = 400;
        ctx.state.errors = errors;
        ctx.state.request = request;
        return ctx.render('index.ejs');
    }

    try {
        const newRequest = await insertOne({
            client: ctx.state.db,
            data: request
        });
        sendRequestConfirmation({
            emailTo: newRequest.contactEmail,
            nameTo: newRequest.contactName,
            maskRequestId: newRequest.id,
            publicNumber: `${newRequest.publicNumber}`.padStart(5, '0')
        });
        ctx.state.success = true;
    } catch (error) {
        signale.error(error);
        ctx.status = 500;
        ctx.state.internalError = true;
        ctx.state.request = request;
    }
    try {
        ctx.state.stats = await getStats(ctx.state.db);
    } catch (error) {
        signale.error(error);
    }
    return ctx.render('index.ejs');
});

const requestStatuses = [
    'DISPATCH_TODO',
    'DISPATCH_PENDING',
    'MANAGEMENT_TODO',
    'MANAGEMENT_BUILDING',
    'MANAGEMENT_DELIVERED'
];

router.get('/track/:id', async ctx => {
    const request = await getOne({ client: ctx.state.db, id: ctx.params.id });

    ctx.state.commandNumber = `${request.publicNumber}`.padStart(5, '0');
    ctx.state.request = request;
    ctx.state.statusIndex = requestStatuses.indexOf(request.status);

    return ctx.render('tracking.ejs');
});

app.use(views(path.resolve(__dirname, './views'), { extension: 'ejs' }))
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app;
