exports.up = function (knex) {
    return knex.schema.alterTable('request', (table) => {
        table.boolean('products-available-for-delivery').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('request', (table) => {
        table.dropColumn('products-available-for-delivery');
    });
};
