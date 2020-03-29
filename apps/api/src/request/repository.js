const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const requestFilterableFields = [
    'requester_type',
    'delivery_postal_code',
    'delivery_city',
    'production_management_id',
    'status',
    'created_at_before',
    'created_at_after',
];
const requestSortableFields = [
    'created_at',
    'requester_type',
    'delivery_postal_code',
    'delivery_city',
    'production_management_id',
    'status',
];

const getFilteredQuery = (client, filters, sort) => {
    const {
        delivery_postal_code,
        delivery_city,
        created_at_before,
        created_at_after,
        ...restFilters
    } = filters;
    const query = client
        .select('*')
        .from('request')
        .where(restFilters);

    if (delivery_postal_code) {
        query.andWhere('delivery_postal_code', 'LIKE', `%${delivery_postal_code}`);
    }
    if (delivery_city) {
        query.andWhere('delivery_city', 'LIKE', `%${delivery_city}%`);
    }
    if (created_at_before) {
        const queryDate = new Date(created_at_before);
        query.andWhere('created_at', '<', queryDate.toISOString());
    }
    if (created_at_after) {
        const queryDate = new Date(created_at_before);
        query.andWhere('created_at', '>', queryDate.toISOString());
    }

    if (sort && sort.length) {
        query.orderBy(...sort);
    }

    return query;
};

const getPaginatedList = async ({
    client,
    filters,
    sort,
    pagination,
}) => {
    const query = getFilteredQuery(
        client,
        filtersSanitizer(filters, requestFilterableFields),
        sortSanitizer(sort, requestSortableFields)
    );
    const [perPage, currentPage] = paginationSanitizer(pagination);

    return query
        .paginate({ perPage, currentPage, isLengthAware: true })
        .then(result => ({
            requests: result.data,
            contentRange: formatPaginationContentRange(
                'requests',
                result.pagination
            ),
        }));
};

const insertOne = (client, request) => client.insert(request).into('request');

module.exports = {
    getPaginatedList,
    insertOne,
}
