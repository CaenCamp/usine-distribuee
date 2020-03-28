const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { getAll, countAll } = require("./repository");

const router = new Router();

router.get("/", async ctx => {
  const users = await getAll(ctx.state.db);
  const count = await countAll(ctx.state.db);

  ctx.response.set("content-range", count);
  ctx.body = users;
});

module.exports = router;
