const Router = require('koa-router');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const usersQueries = require('../user/usersQueries');
const config = require('./config');

const router = new Router();

router.get('/login', async ctx => {
    const { email, password } = ctx.request.body;

    const user = await usersQueries.selectOneByEmail(email);
    if (!user) {
        ctx.throw('Invalid credentials.', 401);
    }
​

    const passwordHash = bcrypt.hashSync(
        password,
        user.salt,
    );
    if (passwordHash !== user.password) {
        ctx.throw('Invalid credentials.', 401);
    }
​

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        config.authentication.privateKey
    );

​
    const cookieToken = crypto
        .createHmac('sha256', config.authentication.secret)
        .update(token)
        .digest('hex');
​
    const delay = config.authentication.expirationTokenDelay * 1000;
    const tokenExpires = new Date(new Date().getTime() + delay);
​
    const cookieOptions = {
        expires: tokenExpires,
        httpOnly: true,
        overwrite: true,
        secure: false,
        secureProxy: false,
        signed: false,
    };
​
    ctx.cookies.set('token', cookieToken, cookieOptions);


    ​ctx.body = {
        token,
        roles: user.roles,
        email: user.email,
    };
});


export default router;
​
