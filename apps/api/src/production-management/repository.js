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

const getFilteredProductionManagementQuery = (client, filters = {}, sort) => {
    const query = client
        .select('*')
        .from('production_management')
        .where(filters)
        .orderBy(...sort);

    return query;
};

const getProductionManagementPaginatedList = async ({
    client,
    filters,
    sort,
    pagination,
}) => {
    const query = getFilteredProductionManagementQuery(
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

const getProductionManagementByIdQuery = (client, id) => {
    const query = client
        .first('*')
        .from('production_management')
        .where({ id });

    return query;
};

const createProductionManagement = async ({ client, apiData }) => {
    return client('production_management')
        .returning('id')
        .insert(apiData)
        .then(([pmId]) => pmId)
        .then(newPmId => getProductionManagementByIdQuery(client, newPmId))
        .catch(error => ({ error }));
};

const getProductionManagement = async ({ client, productionManagementId }) => {
    return getProductionManagementByIdQuery(client, productionManagementId)
        .catch(error => ({ error }));
};

const updateProductionManagement = async ({ client, productionManagementId, apiData }) => {
    return client('production_management')
        .where({ id: productionManagementId })
        .update(apiData)
        .then(() => getProductionManagementByIdQuery(client, productionManagementId))
        .catch(error => ({ error }));
};

const deleteProductionManagement = async ({ client, productionManagementId }) => {
    return client('production_management')
        .where({ id: productionManagementId })
        .del()
        .then(nbDeletion => {
            return nbDeletion ? { id: productionManagementId } : {};
        })
        .catch(error => ({ error }));
};


module.exports = {
    createProductionManagement,
    deleteProductionManagement,
    getProductionManagement,
    getProductionManagementPaginatedList,
    updateProductionManagement,
};
