exports.up = function () {
    // This migration is disabled to fix migration problem on Clever Cloud
    // return knex.schema.raw(
    //     `ALTER TYPE request_status_type ADD VALUE 'CUSTOMER_CANCELED';`
    // );
    return true;
};

exports.down = function () {
    return true;
};
