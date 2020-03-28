const knexStringcase = require('knex-stringcase');

let config = require('./src/config');

if (process.env.CC_ENV) {
    config = config.cleverCloud;
}

const knexConfig = {
    client: 'pg',
    connection: config.db,
    migrations: {
        tableName: 'migrations',
    },
};

module.exports = knexStringcase(knexConfig);
