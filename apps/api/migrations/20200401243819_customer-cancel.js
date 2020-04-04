exports.up = function (knex) {
    // This migration is disabled to fix migration problem on Clever Cloud
    // To fix it for newcomers, CUTOMER_CANCELD status has been added
    // in migration 20200328100536_model-part-2.js
    // return knex.schema.raw(
    //     `ALTER TYPE request_status_type ADD VALUE 'CUSTOMER_CANCELED';`
    // );
    return true;
};

exports.down = function () {
    return true;
};
