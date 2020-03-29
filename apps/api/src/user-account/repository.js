const {
    filtersSanitizer,
    formatPaginationContentRange,
    paginationSanitizer,
    sortSanitizer
} = require('../toolbox/sanitizers');

const filterableFields = ['role'];
const sortableFields = ['created_at', 'last_name'];

const getOneByEmail = ({ client, email }) => {
    return client
        .table('user_account')
        .first(
            'user_account.*',
            client.raw(`(SELECT array_to_json(array_agg(
                production_management_id
            ))
            FROM production_management_user WHERE production_management_user.user_account_id = user_account.id) as production_management_ids`)
        )
        .where('email', email);
};

const getOne = ({ client, id }) => {
    return getOneQuery(client, id).catch(error => ({ error }));
};

const getFilteredQuery = (client, filters, sort) => {
    const query = client
        .select(
            'user_account.*',
            client.raw(`(SELECT array_to_json(array_agg(
                production_management_id
            ))
            FROM production_management_user WHERE production_management_user.user_account_id = user_account.id) as production_management_ids`)
        )
        .from('user_account')
        .where(filters)
        .orderBy(...sort);

    return query;
};

const getPaginatedList = async ({ client, filters, sort, pagination }) => {
    const query = getFilteredQuery(
        client,
        filtersSanitizer(filters, filterableFields),
        sortSanitizer(sort, sortableFields)
    );
    const [perPage, currentPage] = paginationSanitizer(pagination);

    return query
        .paginate({ perPage, currentPage, isLengthAware: true })
        .then(result => ({
            users: result.data,
            contentRange: formatPaginationContentRange(
                'users',
                result.pagination
            )
        }));
};

const updateOne = async ({ client, id, data }) => {
    const { productionManagementIds, ...userData } = data;

    try {
        await client.transaction(trx => {
            client('user_account')
                .transacting(trx)
                .where({ id })
                .update(userData)
                .then(async () => {
                    await client('production_management_user')
                        .transacting(trx)
                        .del()
                        .where({ userAccountId: id });

                    const linksToCreate = productionManagementIds.reduce(
                        (acc, productionManagementId) => {
                            acc.push({
                                userAccountId: id,
                                productionManagementId
                            });

                            return acc;
                        },
                        []
                    );

                    return client('production_management_user')
                        .transacting(trx)
                        .insert(linksToCreate);
                })
                .then(trx.commit)
                .catch(trx.rollback);
        });
    } catch (error) {
        return { error };
    }

    return getOneQuery(client, id).catch(error => ({ error }));
};

const getOneQuery = (client, id) => {
    return client
        .first(
            'user_account.*',
            client.raw(`(SELECT array_to_json(array_agg(
                production_management_id
            ))
            FROM production_management_user WHERE production_management_user.user_account_id = user_account.id) as production_management_ids`)
        )
        .from('user_account')
        .where({ id });
};

const insertOne = async ({ client, data }) => {
    const { productionManagementIds, ...userData } = data;

    return client
        .transaction(trx => {
            client('user_account')
                .transacting(trx)
                .returning('id')
                .insert(userData)
                .then(async ([userAccountId]) => {
                    const linksToCreate = productionManagementIds.reduce(
                        (acc, productionManagementId) => {
                            acc.push({
                                userAccountId,
                                productionManagementId
                            });

                            return acc;
                        },
                        []
                    );

                    await client('production_management_user')
                        .transacting(trx)
                        .insert(linksToCreate);

                    return userAccountId;
                })
                .then(trx.commit)
                .catch(trx.rollback);
        })
        .then(userAccountId => getOneQuery(client, userAccountId))
        .catch(error => ({ error }));
};

const deleteOne = ({ client, id }) => {
    return client('user_account')
        .where({ id })
        .del()
        .then(nbDeletion => {
            return nbDeletion ? { id } : {};
        })
        .catch(error => ({ error }));
};

module.exports = {
    deleteOne,
    getOneByEmail,
    getOne,
    getPaginatedList,
    insertOne,
    updateOne
};
