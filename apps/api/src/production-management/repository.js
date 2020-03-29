const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const filterableFields = [];
const sortableFields = [
    'name',
];

const getFilteredQuery = (client, filters = {}, sort) => {
    const query = client
        .select('*')
        .from('production_management')
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
        filtersSanitizer(filters, filterableFields),
        sortSanitizer(sort, sortableFields)
    );
    const [perPage, currentPage] = paginationSanitizer(pagination);

    return query
        .paginate({ perPage, currentPage, isLengthAware: true })
        .then(result => ({
            productionManagements: result.data,
            contentRange: formatPaginationContentRange(
                'production-managements',
                result.pagination
            ),
        }));
};

const getOneByIdQuery = (client, id) => {
    const query = client
        .first('*')
        .from('production_management')
        .where({ id });

    return query;
};

const insertOne = async ({ client, data }) => {
    return client('production_management')
        .returning('id')
        .insert(data)
        .then(([pmId]) => pmId)
        .then(newPmId => getOneByIdQuery(client, newPmId))
        .catch(error => ({ error }));
};

const getOne = async ({ client, productionManagementId }) => {
    return getOneByIdQuery(client, productionManagementId)
        .catch(error => ({ error }));
};

const updateOne = async ({ client, productionManagementId, data }) => {
    return client('production_management')
        .where({ id: productionManagementId })
        .update(data)
        .then(() => getOneByIdQuery(client, productionManagementId))
        .catch(error => ({ error }));
};

const removeOne = async ({ client, productionManagementId }) => {
    return client('production_management')
        .where({ id: productionManagementId })
        .del()
        .then(nbDeletion => {
            return nbDeletion ? { id: productionManagementId } : {};
        })
        .catch(error => ({ error }));
};


module.exports = {
    insertOne,
    removeOne,
    getOne,
    getPaginatedList,
    updateOne,
};
