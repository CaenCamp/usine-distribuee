const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const error = require('koa-json-error');
const compress = require('koa-compress');

const config = require('./config');
const dbMiddleware = require('./dbMiddleware');
const httpsMiddleware = require('./httpsMiddleware');

const authenticationRouter = require('./authentication/router');
const authenticationMiddleware = require('./authentication/middleware');

const front = require('./front');

const userAccountRouter = require("./user-account/router");
const productionManagementRouter = require('./production-management/router');
const requestRouter = require("./request/router");
const statRouter = require("./stat/router");

const app = new Koa();

if (config.env === 'production') {
    app.proxy = true;
}

// See https://github.com/zadzbw/koa2-cors for configuration
app.use(
    cors({
        credentials: true,
        origin: config.env === 'development' ? "http://localhost:8002" : null,
        allowHeaders: ["Origin, Content-Type, Accept, Authorization, Cookie"],
        exposeHeaders: ["Content-Range"]
    })
);


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

app.use(httpsMiddleware);
app.use(bodyParser());
app.use(error(formatError));
app.use(compress());

app.use(serve(path.resolve(__dirname, '../public')));
app.use(mount('/', front));
app.use(mount('/admin', serve(path.resolve(__dirname, '../admin'))));

app.use(dbMiddleware);
app
    .use(authenticationRouter.routes())
    .use(authenticationRouter.allowedMethods());

app.use(authenticationMiddleware);

app.use(mount("/api/user-accounts", userAccountRouter.routes()));
app.use(mount("/api/production-managements", productionManagementRouter.routes()));
app.use(mount("/api/dispatcher-requests", requestRouter.routes()));
app.use(mount("/api/requests", requestRouter.routes()));
app.use(mount("/api/production-manager-requests", requestRouter.routes()));
app.use(mount("/api/stats", statRouter.routes()));

app.listen(config.port, () =>
    global.console.log(`API started on port ${config.port}`)
);
