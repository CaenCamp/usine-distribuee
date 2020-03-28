exports.up = function (knex) {
    return knex.schema
        .createTable('request', function (table) {
            table
                .uuid('id')
                .primary()
                .defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('requester_name').notNullable();
            table.enu(
                'requester_type',
                ['finess', 'rpps', 'adeli', 'other'],
                { useNative: true, enumName: 'health_professional_type' }
            ).notNullable();
            table.string('requester_professional_identifier').notNullable();
            table.string('contact_name').notNullable();
            table.string('contact_email').notNullable();
            table.string('contact_phone').notNullable();
            table.text('delivery_address').notNullable();
            table.string('delivery_postal_code').notNullable();
            table.string('delivery_city').notNullable();
            table.text('requester_comment').nullable();
            table.integer('mask_small_size_quantity').notNullable().defaultTo(0);
            table.integer('mask_large_size_quantity').notNullable().defaultTo(0);
            table.uuid('id_production_management').nullable();
            table
                .foreign('id_production_management')
                .references('production_management.id')
                .onDelete('SET NULL');

            table.jsonb('production_management_comments').nullable();

            table.enu(
                'status',
                ['to_dispatch', 'rejected', 'to_confirm', 'assigned', 'in_production', 'produced', 'delivered'],
                { useNative: true, enumName: 'request_status_type' }
            ).notNullable().defaultTo('to_dispatch');
            table.dateTime('created_at').defaultTo(knex.fn.now());
            table.dateTime('updated_at').defaultTo(knex.fn.now());
        });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTable('request');
    await knex.raw('DROP TYPE IF EXISTS health_professional_type');
    return knex.raw('DROP TYPE IF EXISTS request_status_type');
};
