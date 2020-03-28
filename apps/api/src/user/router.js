const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const {
    getPaginatedList,
    getOneById,
    updateOne,
    insertOne
} = require("./repository");

const router = new Router({
    prefix: '/api/users',
});

router.get('/', async ctx => {
    const { users, contentRange } = await getPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination),
    });

    ctx.set('Content-Range', contentRange);
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
