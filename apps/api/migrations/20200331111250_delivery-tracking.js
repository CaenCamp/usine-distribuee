exports.up = async function (knex) {
    await knex.raw(`
            UPDATE request
            SET status = 'MANAGEMENT_BUILDING'
            WHERE status = 'MANAGEMENT_BUILT'
        ;
    `);
    return knex.schema.alterTable('request', (table) => {
        table.jsonb('delivery_tracking').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('request', (table) => {
        table.dropColumn('delivery_tracking');
    });
};
