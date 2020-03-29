const Router = require('koa-router');

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const {
    getPaginatedList,
    getOne,
} = require('./repository');

const router = new Router();

router.get('/', async ctx => {
    const { requests, contentRange } = await getPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination),
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = requests;
});

router.get('/:id', async ctx => {
    const request = await getOne({
        client: ctx.state.db,
        id: ctx.params.id,
    });

    if (request.error) {
        const explainedError = new Error(request.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    if (!request.id) {
        const explainedError = new Error(
            `The production management of id ${ctx.params.id} does not exist.`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = request;
});

module.exports = router;
