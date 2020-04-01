const Router = require('koa-router');

const { getGlobalStats } = require('./repository');

const router = new Router();

router.get('/', async (ctx) => {
    const { globalStats, contentRange } = await getGlobalStats({
        client: ctx.state.db
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = globalStats;
});

module.exports = router;
