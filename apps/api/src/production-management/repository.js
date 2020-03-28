const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer,
} = require('../toolbox/sanitizers');

const ProductionManagementFilterableFields = [];
const ProductionManagementSortableFields = [
    'name',
];

const getFilteredProductionManagementQuery = (client, filters = {}, sort) => {
    const query = client
        .select('*')
        .from('production_management')
        .where(filters);

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
        filtersSanitizer(filters, ProductionManagementFilterableFields),
        sortSanitizer(sort, ProductionManagementSortableFields)
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


module.exports = {
    createProductionManagement,
    getProductionManagementPaginatedList,
};
