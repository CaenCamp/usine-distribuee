const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router')
const views = require('koa-views');

const app = new Koa();
const router = new Router();

const { mtime } = fs.statSync(path.resolve(__dirname, './views/index.ejs'));

const renderCachedHomepage = async (ctx) => {
    ctx.set('ETag', `"${mtime.getTime().toString()}"`);

    if (ctx.fresh) {
        ctx.status = 304;
        return;
    }

    ctx.state = { errors: {}, request: {}, success: false };
    return ctx.render('index.ejs');
};

router.get('/', renderCachedHomepage);

const parseRequest = ({ mask_small_size_quantity, mask_large_size_quantity, forecast_quantity, forecast_days, ...body }) => ({
    ...body,
    mask_small_size_quantity: parseInt(mask_small_size_quantity, 10),
    mask_large_size_quantity: parseInt(mask_large_size_quantity, 10),
    forecast_quantity: parseInt(forecast_quantity, 10),
    forecast_days: parseInt(forecast_days, 10),
});

const validate = ({ mask_small_size_quantity, mask_large_size_quantity }) => {
    const errors = {};

    if (mask_small_size_quantity && mask_small_size_quantity < 5) {
        errors.mask_small_size_quantity = 'La commande doit comporter au moins 5 masques pour être valide';
    }

    if (mask_large_size_quantity && mask_large_size_quantity < 5) {
        errors.mask_small_size_quantity = 'La commande doit comporter au moins 5 masques pour être valide';
    }

    return errors;
}

router.post('/', async (ctx) => {
    ctx.state = { errors: {}, request: {}, success: false };

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

    // TODO: Create the request in DB

    ctx.state.success = true;
    return ctx.render('index.ejs');
})

app
    .use(views(path.resolve(__dirname, './views'), { extension: 'ejs' }))
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app;
