const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const error = require('koa-json-error');

const config = require('./config');
const dbMiddleware = require('./dbMiddleware');
const authenticationRouter = require('./authentication/authenticationRouter');
const authenticationMiddleware = require('./authentication/authenticationMiddleware');

const app = new Koa();

// See https://github.com/zadzbw/koa2-cors for configuration
app.use(
    cors({
        origin: '*',
        allowHeaders: ['Origin, Content-Type, Accept'],
        exposeHeaders: ['Content-Range']
    })
);

const router = new Router();
const env = process.env.NODE_ENV;

/**
 * This method is used to format message return by the global error middleware
 *
 * @param {object} error - the catched error
 * @return {object} the content of the json error return
 */
const formatError = error => {
    return {
        status: error.status,
        message: error.message
    };
};

app.use(bodyParser());
app.use(error(formatError));

app.use(serve(path.resolve(__dirname, '../public')));

app.use(mount('/admin', serve(path.resolve(__dirname, '../admin'))));

app.use(dbMiddleware);

app.use(authenticationRouter.routes()).use(authenticationRouter.allowedMethods());;

// app.use(authenticationMiddleware);

router.get('/api', ctx => {
    ctx.body = { message: 'Usine Distribuée API' };
});
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () =>
    global.console.log(`API started on port ${config.port}`)
);
