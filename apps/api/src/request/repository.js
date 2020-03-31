const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const filterableFields = [
    'requesterType',
    'deliveryPostalCode',
    'deliveryCity',
    'productionManagementId',
    'status',
    'createdAtBefore',
    'createdAtAfter',
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
        deliveryPostalCode,
        deliveryCity,
        createdAtBefore,
        createdAtAfter,
        ownership,
        ...restFilters
    } = filters;
    const query = client
        .select('*')
        .from(table)
        .where(restFilters);

    if (deliveryPostalCode) {
        query.andWhere('delivery_postal_code', 'LIKE', `${deliveryPostalCode}%`);
    }
    if (deliveryCity) {
        query.andWhere('delivery_city', 'LIKE', `%${deliveryCity}%`);
    }
    if (createdAtBefore) {
        const queryDate = new Date(createdAtBefore);
        query.andWhere('created_at', '<', queryDate.toISOString());
    }
    if (createdAtAfter) {
        const queryDate = new Date(createdAtAfter);
        query.andWhere('created_at', '>', queryDate.toISOString());
    }
    if (ownership && ownership === 'me') {
        query.whereIn('production_management_id', user.productionManagementIds || []);
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
