
exports.up = function (knex) {
    return knex.schema.alterTable('request', table => {
        table.integer('forecast_quantity').notNullable().defaultTo(0);
        table.integer('forecast_days').notNullable().defaultTo(0);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('request', table => {
        table.dropColumn('forecast_quantity');
        table.dropColumn('forecast_days');
    });
};
