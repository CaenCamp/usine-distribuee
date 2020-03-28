const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { getOneById } = require("../user/repository");
const config = require("../config");

module.exports = async (ctx, next) => {
  const token = ctx.request.get("Authorization");
  const cookieToken = ctx.cookies.get("token");

  if (!token) {
    ctx.throw("Invalid credentials.", 401);
    return;
  }

  const expectedCookieToken = crypto
    .createHmac("sha256", config.authentication.secret)
    .update(token)
    .digest("hex");

  if (cookieToken !== expectedCookieToken) {
    ctx.throw("Forbidden.", 403);
    return;
  }

  try {
    const { id: userId } = await jwt.verify(
      token,
      config.authentication.privateKey
    );
    ctx.state.user = await selectOneById(ctx.state.db, userId);
  } catch (e) {
    ctx.throw("Forbidden.", 403);
    return;
  }
  await next();
};
