const Router = require('koa-router');

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const { createProductionManagement, getProductionManagementPaginatedList } = require('./repository');

const router = new Router({
    prefix: '/api/production-managements',
});

router.get('/', async ctx => {
    const { productionManagements, contentRange } = await getProductionManagementPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination),
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = productionManagements;
});

router.post('/', async ctx => {
    const newProductionManagement = await createProductionManagement({
        client: ctx.state.db,
        apiData: ctx.request.body,
    });

    if (newProductionManagement.error) {
        const explainedError = new Error(newProductionManagement.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    ctx.body = newProductionManagement;
});


module.exports = router;
