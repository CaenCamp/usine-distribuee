const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const usersQueries = require('../user/usersQueries');
const config = require('./config');

export default async (ctx, next) => {
    const token = ctx.request.get('Authorization');
    const cookieToken = ctx.cookies.get('token');
​
    if (!token) {
        ctx.throw('Invalid credentials.', 401);
        return;
    }
​
    const expectedCookieToken = crypto
        .createHmac('sha256', config.authentication.secret)
        .update(token)
        .digest('hex');
​
    if (cookieToken !== expectedCookieToken) {
        ctx.throw('Forbidden.', 403);
        return;
    }
​
    try {
        const { id: userId } = await jwt.verify(token, config.authentication.privateKey);
        ctx.state.user = await userQueries.selectOneById(userId);
    } catch (e) {
        ctx.throw('Forbidden.', 403);
        return;
    }

  await next();
};
