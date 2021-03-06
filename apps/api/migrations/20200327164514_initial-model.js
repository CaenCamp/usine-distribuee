exports.up = async function (knex) {
    await knex.raw(`CREATE extension IF NOT EXISTS "uuid-ossp"`);
    return knex.schema
        .createTable('user_account', function (table) {
            table
                .uuid('id')
                .primary()
                .defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('first_name').nullable();
            table.string('last_name').nullable();
            table.string('phone').nullable();
            table.enu(
                'role',
                ['admin', 'dispatcher', 'production_manager', 'guest'],
                { useNative: true, enumName: 'user_role' }
            );
            table.dateTime('created_at').defaultTo(knex.fn.now());
            table.dateTime('updated_at').defaultTo(knex.fn.now());
            table.unique('email');
        })
        .createTable('production_management', function (table) {
            table
                .uuid('id')
                .primary()
                .defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('name').notNullable();
            table.text('description').nullable();
            table.text('address').nullable();
            table.string('email').nullable();
            table.string('phone').nullable();
            table.dateTime('created_at').defaultTo(knex.fn.now());
            table.dateTime('updated_at').defaultTo(knex.fn.now());
        })
        .createTable('production_management_user', function (table) {
            table.uuid('user_account_id').notNullable();
            table
                .foreign('user_account_id')
                .references('user_account.id')
                .onDelete('CASCADE');
            table.uuid('production_management_id').notNullable();
            table
                .foreign('production_management_id')
                .references('production_management.id')
                .onDelete('CASCADE');
            table.dateTime('created_at').defaultTo(knex.fn.now());
        });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTable('production_management_user')
        .dropTable('production_management')
        .dropTable('user_account')
        .dropExtensionIfExists('uuid-ossp');

    return knex.raw('DROP TYPE IF EXISTS user_role');
};
