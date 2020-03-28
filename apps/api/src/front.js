const path = require('path');
const Koa = require('koa');
const Router = require('koa-router')
const views = require('koa-views');

const app = new Koa();
const router = new Router();


router.get('/', async (ctx) => {
    return ctx.render('index.ejs');
});

app
    .use(views(path.resolve(__dirname, './views'), { extension: 'ejs' }))
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app;
