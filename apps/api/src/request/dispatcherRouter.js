const Router = require("koa-router");

const { parseJsonQueryParameter } = require("../toolbox/sanitizers");
const { getPaginatedList, getOne, updateOne } = require("./repository");
const { isStatusChangeAuthorized } = require("./authorization");

const router = new Router();

router.get("/", async ctx => {
    const { requests, contentRange } = await getPaginatedList({
        client: ctx.state.db,
        filters: parseJsonQueryParameter(ctx.query.filters),
        sort: parseJsonQueryParameter(ctx.query.sort),
        pagination: parseJsonQueryParameter(ctx.query.pagination)
    });

    ctx.set("Content-Range", contentRange);
    ctx.body = requests;
});

router.put("/:id", async ctx => {
    const user = ctx.state.user;
    const updatedData = ctx.request.body;

    const { status } = await getOne(ctx.params.id);
    if (status !== updatedData.status) {
        if (!isStatusChangeAuthorized(user.role, status, updatedData.status)) {
            const error = new Error(
                `Forbidden. Cannot change status from ${status} to ${updatedData.status} in that case`
            );
            error.status = 403;

            throw error;
        }
    }

    const updatedRequest = await updateOne({
        client: ctx.state.db,
        id: ctx.params.id,
        data: updatedData
    });

    if (!updatedRequest.id) {
        const error = new Error(
            `The organization of id ${ctx.params.productionManagementId} does not exist, so it could not be updated`
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
