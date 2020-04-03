exports.up = function (knex) {
    return knex.schema.raw(
        `ALTER TYPE request_status_type ADD VALUE 'CUSTOMER_CANCELED';`
    );
};

exports.down = function () {
    return true;
};
