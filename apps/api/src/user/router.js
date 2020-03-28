const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  getAll,
  countAll,
  getOneById,
  updateOne,
  insertOne
} = require("./repository");

const router = new Router();

router.get("/", async ctx => {
  const users = await getAll(ctx.state.db);
  const count = await countAll(ctx.state.db);

  ctx.response.set("content-range", count[0].count);
  ctx.body = users;
});

router.get("/:id", async ctx => {
  const user = await getOneById(ctx.state.db, ctx.params.id);
  ctx.body = user;
});

router.put("/:id", async ctx => {
  const { email, role, firstName, lastName, phone } = ctx.request.body;

  const user = await updateOne(ctx.state.db, ctx.params.id, {
    email,
    role,
    firstName,
    lastName,
    phone
  });

  ctx.body = user;
});

router.post("/", async ctx => {
  const {
    email,
    role,
    firstName,
    lastName,
    phone,
    password
  } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await insertOne(ctx.state.db, {
    email,
    role,
    firstName,
    lastName,
    phone,
    password: hashedPassword
  });

  ctx.body = user[0];
});

module.exports = router;
