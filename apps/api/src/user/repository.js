const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const userFilterableFields = [
    'role'
];
const userSortableFields = [
    'created_at',
    'last_name',
];

const getOneByEmail = (client, email) => {
    return client
        .table('user_account')
        .first('*')
        .where('email', email);
};

const getOneById = (client, id) => {
    return client
        .table('user_account')
        .first('*')
        .where({ id });
};

const getFilteredQuery = (client, filters, sort) => {
    const query = client
        .select('*')
        .from('user_account')
        .where(filters)
        .orderBy(...sort);

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
        filtersSanitizer(filters, userFilterableFields),
        sortSanitizer(sort, userSortableFields)
    );
    const [perPage, currentPage] = paginationSanitizer(pagination);

    return query
        .paginate({ perPage, currentPage, isLengthAware: true })
        .then(result => ({
            users: result.data,
            contentRange: formatPaginationContentRange(
                'users',
                result.pagination
            ),
        }));
};

const updateOne = (client, id, changes) => {
    return client
        .table('user_account')
        .where({ id })
        .update(changes, ['*']);
};

const insertOne = (client, data) => {
    return client
        .table('user_account')
        .insert(data, ['*']);
};

module.exports = {
    getOneByEmail,
    getOneById,
    getPaginatedList,
    insertOne,
    updateOne,
};
