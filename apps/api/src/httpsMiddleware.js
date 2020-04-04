const config = require('./config');

module.exports = async (ctx, next) => {
    if (config.env === 'production' && ctx.request.protocol !== 'https') {
        ctx.redirect(ctx.request.href.replace(ctx.request.protocol, 'https'));
        return;
    }
    await next();
};
