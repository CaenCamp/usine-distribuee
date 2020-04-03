const getGlobalStats = ({ client }) => {
    const query = client.select(`*`).from('global_stats');

    return query.then(result => ({
        globalStats: result
    }));
};

const getRequesterByDept = ({ client }) => {
    const query = client
        .select(client.raw(`left(delivery_postal_code, 2) as department`))
        .countDistinct(
            `requester_professional_identifier as requester_nb_by_department`
        )
        .from('request')
        .groupBy(client.raw(`left(delivery_postal_code, 2)`))
        .orderBy('requester_nb_by_department', 'DESC');

    return query.then(result => ({
        requesterByDept: result
    }));
};

module.exports = {
    getGlobalStats,
    getRequesterByDept
};
