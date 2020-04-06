const Router = require('koa-router');

const { getGlobalStats, getRequesterByDept } = require('./repository');

const router = new Router();

router.get('/', async (ctx) => {
    const { globalStats, contentRange } = await getGlobalStats({
        client: ctx.state.db
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = globalStats;
});

router.get('/requesterByDept', async (ctx) => {
    const { requesterByDept, contentRange } = await getRequesterByDept({
        client: ctx.state.db
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = requesterByDept;
});

module.exports = router;
