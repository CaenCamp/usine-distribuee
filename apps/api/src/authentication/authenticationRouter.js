const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { getOneByEmail } = require("../user/repository");
const config = require("../config");

const router = new Router();

router.post("/login", async ctx => {
  const { email, password } = ctx.request.body;

  const user = await getOneByEmail(ctx.state.db, email);

  if (!user) {
    ctx.throw("Invalid credentials.", 401);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    ctx.throw("Invalid credentials.", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    config.authentication.privateKey
  );

  const cookieToken = crypto
    .createHmac("sha256", config.authentication.secret)
    .update(token)
    .digest("hex");

  const delay = config.authentication.expirationTokenDelay * 1000;

  const tokenExpires = new Date(new Date().getTime() + delay);

  const cookieOptions = {
    expires: tokenExpires,
    httpOnly: true,
    overwrite: true,
    secure: false,
    secureProxy: false,
    signed: false
  };

  ctx.cookies.set("token", cookieToken, cookieOptions);

  ctx.body = {
    token: token,
    role: user.role,
    email: user.email
  };
});

module.exports = router;
