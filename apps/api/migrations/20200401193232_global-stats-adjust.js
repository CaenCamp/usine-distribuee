exports.up = async function (knex) {
    return knex.raw(`
        CREATE OR REPLACE VIEW global_stats AS
            SELECT
                1 as id,
                count(distinct request.id) as request_nb,
                count(distinct request.requester_professional_identifier) as requester_nb,
                sum(request.mask_small_size_quantity + request.mask_large_size_quantity) as requested_shade_qty,
                sum(case when request.status = 'MANAGEMENT_BUILDING' then request.mask_small_size_quantity + request.mask_large_size_quantity else 0 end) as in_production_shade_qty,
                sum(request.mask_small_size_delivered_quantity + request.mask_large_size_delivered_quantity) as delivered_shade_qty,
                sum(case when request.status <> 'DISPATCH_REJECTED' then request.mask_small_size_quantity + request.mask_large_size_quantity else 0 end)
                -
                sum(request.mask_small_size_delivered_quantity + request.mask_large_size_delivered_quantity) as requested_shade_except_rejected_qty
            FROM request
        ;
    `);
};

exports.down = async function (knex) {
    return knex.raw('DROP VIEW IF EXISTS global_stats');
};
