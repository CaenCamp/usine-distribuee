const Router = require("koa-router");

const { parseJsonQueryParameter } = require("../toolbox/sanitizers");
const { getPaginatedList, getOne, updateOne } = require("./repository");
const { isAuthorized } = require("./authorization");

const router = new Router();

router.get("/", async ctx => {
    const { requests, contentRange } = await getPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination),
        user: ctx.state.user
    });

    ctx.set("Content-Range", contentRange);
    ctx.body = requests;
});

router.get('/:id', async ctx => {
    const request = await getOne({
        client: ctx.state.db,
        id: ctx.params.id,
    });

    if (request.error) {
        const explainedError = new Error(request.error.message);
        explainedError.status = 404;

        throw explainedError;
    }

    if (!request.id) {
        const explainedError = new Error(
            `The production management of id ${ctx.params.id} does not exist.`
        );
        explainedError.status = 404;

        throw explainedError;
    }

    ctx.body = request;
});

router.put("/:id", async ctx => {
    const user = ctx.state.user;
    const updatedData = ctx.request.body;

    const request = await getOne({
        client: ctx.state.db,
        id: ctx.params.id,
    });

    if (!isAuthorized(user, request, updatedData)) {
        const error = new Error("Forbidden.");
        error.status = 403;

        throw error;
    }

    const updatedRequest = await updateOne({
        client: ctx.state.db,
        id: ctx.params.id,
        data: updatedData
    });

    if (!updatedRequest.id) {
        const error = new Error(
            `The organization of id ${ctx.params.id} does not exist, so it could not be updated`
        );
        error.status = 404;

        throw error;
    }

    if (updatedRequest.error) {
        const error = new Error(updatedProductionManagement.error.message);
        error.status = 400;

        throw error;
    }

    ctx.body = updatedRequest;
});

module.exports = router;
