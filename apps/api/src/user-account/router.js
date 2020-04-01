const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pick = require('lodash.pick');

const { parseJsonQueryParameter } = require('../toolbox/sanitizers');
const {
    deleteOne,
    getPaginatedList,
    getOne,
    updateOne,
    insertOne
} = require('./repository');

const router = new Router();

router.get('/', async ctx => {
    const { users, contentRange } = await getPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination)
    });

    ctx.set('Content-Range', contentRange);
    ctx.body = users;
});

router.get('/:id', async ctx => {
    const user = await getOne({ client: ctx.state.db, id: ctx.params.id });
    ctx.body = user;
});

router.put('/:id', async ctx => {
    const { newPassword, ...updatedData } = ctx.request.body;

    if (newPassword && newPassword.trim().length) {
        const salt = bcrypt.genSaltSync(10);
        updatedData.password = bcrypt.hashSync(newPassword, salt);
    }

    await updateOne({
        client: ctx.state.db,
        id: ctx.params.id,
        data: pick(updatedData, [
            'email',
            'password',
            'first_name',
            'last_name',
            'phone',
            'role',
            'productionManagementIds'
        ])
    });
    const updatedUser = await getOne({
        client: ctx.state.db,
        id: ctx.params.id
    });

    ctx.body = updatedUser;
});

router.delete('/:id', async ctx => {
    const deletedUser = await deleteOne({
        client: ctx.state.db,
        id: ctx.params.id
    });

    if (deletedUser.error) {
        const explainedError = new Error(deletedUser.error.message);
        explainedError.status = 400;

        throw explainedError;
    }

    if (!deletedUser.id) {
        const explainedError = new Error(
            `The user of id ${ctx.params.UserId} does not exist.`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = deletedUser;
});

router.post('/', async ctx => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(ctx.request.body.password, salt);

    const user = await insertOne({
        client: ctx.state.db,
        data: {
            ...pick(ctx.request.body, [
                'email',
                'first_name',
                'last_name',
                'phone',
                'role',
                'productionManagementIds'
            ]),
            password: hashedPassword
        }
    });

    ctx.body = user;
});

module.exports = router;
