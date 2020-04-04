exports.up = async function (knex) {
    await knex.raw(`DROP VIEW IF EXISTS global_stats`);
    return knex.raw(`
        CREATE OR REPLACE VIEW global_stats AS
        SELECT
            count(distinct request.requester_professional_identifier) as requester_nb,
            count(distinct request.id) as request_nb,
            count(distinct
                case when request.status = 'DISPATCH_TODO'
                then request.id
                else null
                end
            ) as request_nb_to_dispatch,
            count(distinct
                case when request.status = 'MANAGEMENT_TODO'
                then request.id
                else null
                end
            ) as request_nb_to_build,
            count(distinct
                case when request.status = 'MANAGEMENT_BUILDING'
                then request.id
                else null
                end
            ) as request_nb_in_production,
            count(distinct
                case when request.status = 'MANAGEMENT_DELIVERED'
                then request.id
                else null
                end
            ) as request_nb_delivered,
            count(distinct
                case when request.status = 'DISPATCH_PENDING'
                then request.id
                else null
                end
            ) as request_nb_pending,
            count(distinct
                case when request.status in ('DISPATCH_REJECTED','CUSTOMER_CANCELED')
                then request.id
                else null
                end
            ) as request_nb_cancel,
            sum(request.mask_small_size_quantity + request.mask_large_size_quantity) as requested_shade_qty,
            sum(
                case when request.status not in ('DISPATCH_REJECTED','CUSTOMER_CANCELED')
                then request.mask_small_size_quantity + request.mask_large_size_quantity
                else 0
                end
            ) as requested_shade_except_rejected_qty,
            sum(
                case when request.status in ('DISPATCH_TODO', 'DISPATCH_PENDING', 'MANAGEMENT_TODO')
                then request.mask_small_size_quantity + request.mask_large_size_quantity
                else 0
                end
            ) as requested_shade_to_build,
            sum(
                case when request.status = 'MANAGEMENT_BUILDING'
                then request.mask_small_size_quantity + request.mask_large_size_quantity
                else 0
                end
            ) as requested_shade_in_production,
            sum(
                case when request.status = 'MANAGEMENT_DELIVERED'
                then request.mask_small_size_quantity + request.mask_large_size_quantity
                else 0
                end
            ) as requested_shade_delivered,
            sum(
                case when request.status in ('DISPATCH_REJECTED','CUSTOMER_CANCELED')
                then request.mask_small_size_quantity + request.mask_large_size_quantity
                else 0
                end
            ) as requested_shade_canceled
        FROM request
        ;
    `);
};

exports.down = async function (knex) {
    return knex.raw('DROP VIEW IF EXISTS global_stats');
};
