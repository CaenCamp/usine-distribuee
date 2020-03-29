const Router = require('koa-router');

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const {
    getPaginatedList,
} = require('./repository');

const router = new Router({
    prefix: '/api/requests',
});

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

module.exports = router;
