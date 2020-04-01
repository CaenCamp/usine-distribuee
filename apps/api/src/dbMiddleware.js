const knex = require('knex');
const { attachPaginate } = require('knex-paginate');

const knexfile = require('../knexfile');

attachPaginate();
const db = knex({
    ...knexfile,
    pool: { min: 0, max: 7 }
});

module.exports = async (ctx, next) => {
    ctx.state.db = db;
    await next();
};
