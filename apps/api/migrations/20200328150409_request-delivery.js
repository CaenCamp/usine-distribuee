exports.up = function(knex) {
    return knex.schema.alterTable('request', table => {
        table
            .integer('mask_small_size_delivered_quantity')
            .notNullable()
            .defaultTo(0);
        table
            .integer('mask_large_size_delivered_quantity')
            .notNullable()
            .defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('request', table => {
        table.dropColumn('mask_small_size_delivered_quantity');
        table.dropColumn('mask_large_size_delivered_quantity');
    });
};
