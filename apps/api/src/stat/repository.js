const { formatPaginationContentRange } = require('../toolbox/sanitizers');

const getGlobalStats = ({ client }) => {
    const query = client.select(`*`).from('global_stats');

    return query.then(result => ({
        globalStats: result
    }));
};

module.exports = {
    getGlobalStats
};
