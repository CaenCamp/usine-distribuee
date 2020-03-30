exports.up = function (knex) {
    return knex.schema.alterTable('request', table => {
        table.string('requester_other_type').nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('request', table => {
        table.dropColumn('requester_other_type');
    });
};
