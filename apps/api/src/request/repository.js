const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const filterableFields = [
    'requester_type',
    'delivery_postal_code',
    'delivery_city',
    'production_management_id',
    'status',
    'created_at_before',
    'created_at_after',
    'ownership',
];
const sortableFields = [
    'createdAt',
    'requesterType',
    'deliveryPostalCode',
    'deliveryCity',
    'productionManagementId',
    'status',
    'maskSmallSizeQuantity',
    'maskLargeSizeQuantity'
];

const table = 'request';

const getFilteredQuery = (client, filters, sort, user) => {
    const {
        delivery_postal_code,
        delivery_city,
        created_at_before,
        created_at_after,
        ownership,
        status,
        ...restFilters
    } = filters;
    const query = client
        .select('*')
        .from(table)
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
    if (ownership && ownership === 'me') {
        query.whereIn('production_management_id', user.productionManagementIds || []);
    }
    if (status && status !== 'MANAGEMENT_ALL') {
        query.andWhere('status', status);
    }
    if (status && status === 'MANAGEMENT_ALL') {
        query.whereIn('status', [
            'MANAGEMENT_TODO',
            'MANAGEMENT_BUILDING',
            'MANAGEMENT_BUILT',
            'MANAGEMENT_DELIVERED',
        ]);
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
    user
}) => {
    const query = getFilteredQuery(
        client,
        filtersSanitizer(filters, filterableFields),
        sortSanitizer(sort, sortableFields),
        user
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

const getOneByIdQuery = (client, id) => {
    const query = client
        .first('*')
        .from('request')
        .where({ id });

    return query;
};

const insertOne = async ({ client, data }) => {
    return client('request')
        .returning('id')
        .insert(data)
        .then(([id]) => id)
        .then(id => getOneByIdQuery(client, id))
        .catch(error => ({ error }));
};

const updateOne = async ({ client, id, data }) => {
    return client('request')
        .where({ id: id })
        .update(data)
        .then(() => getOneByIdQuery(client, id))
        .catch(error => ({ error }));
};

const getOne = async ({ client, id }) => {
    return getOneByIdQuery(client, id)
        .catch(error => ({ error }));
};

module.exports = {
    getPaginatedList,
    insertOne,
    updateOne,
    getOne,
}
