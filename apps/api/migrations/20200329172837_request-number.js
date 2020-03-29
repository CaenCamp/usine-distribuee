exports.up = function(knex) {
    return knex.schema.raw(`ALTER TABLE request ADD COLUMN public_number SERIAL;`);
};

exports.down = function(knex) {
    return knex.schema.alterTable("request", table => {
        table.dropColumn("public_number");
    });
};
