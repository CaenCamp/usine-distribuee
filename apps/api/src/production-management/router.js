const Router = require('koa-router');

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const {
    createProductionManagement,
    deleteProductionManagement,
    getProductionManagement,
    getProductionManagementPaginatedList,
    updateProductionManagement,
} = require('./repository');

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

router.get('/:productionManagementId', async ctx => {
    const productionManagement = await getProductionManagement({
        client: ctx.state.db,
        productionManagementId: ctx.params.productionManagementId,
    });

    if (productionManagement.error) {
        const explainedError = new Error(productionManagement.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    if (!productionManagement.id) {
        const explainedError = new Error(
            `The production management of id ${ctx.params.productionManagementId} does not exist.`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = productionManagement;
});

router.delete('/:productionManagementId', async ctx => {
    const deletedProductionManagement = await deleteProductionManagement({
        client: ctx.state.db,
        productionManagementId: ctx.params.productionManagementId,
    });

    if (deletedProductionManagement.error) {
        const explainedError = new Error(deletedProductionManagement.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    if (!deletedProductionManagement.id) {
        const explainedError = new Error(
            `The production management of id ${ctx.params.productionManagementId} does not exist.`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = deletedProductionManagement;
});

router.put('/:productionManagementId', async ctx => {
    const updatedProductionManagement = await updateProductionManagement({
        client: ctx.state.db,
        productionManagementId: ctx.params.productionManagementId,
        apiData: ctx.request.body,
    });

    if (updatedProductionManagement.error) {
        const explainedError = new Error(updatedProductionManagement.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    if (!updatedProductionManagement.id) {
        const explainedError = new Error(
            `The organization of id ${ctx.params.productionManagementId} does not exist, so it could not be updated`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = updatedProductionManagement;
});

module.exports = router;
