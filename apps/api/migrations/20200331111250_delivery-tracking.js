exports.up = async function (knex) {
    await knex.raw(`
            UPDATE request
            SET status = 'MANAGEMENT_BUILDING'
            WHERE status = 'MANAGEMENT_BUILT'
        ;
    `);
    await knex.raw(`
            DELETE FROM pg_enum
            WHERE enumlabel = 'MANAGEMENT_BUILT'
            AND enumtypid = (
                SELECT oid FROM pg_type WHERE typname = 'status'
            )
        ;
    `);
    return knex.schema.alterTable('request', table => {
        table.jsonb('delivery_tracking').nullable();
    });
};

exports.down = async function (knex) {
    await knex.raw(`
            ALTER TYPE status
            ADD VALUE 'MANAGEMENT_BUILT'
            AFTER 'MANAGEMENT_BUILDING'
        ;
    `);
    return knex.schema.alterTable('request', table => {
        table.dropColumn('delivery_tracking');
    });
};
