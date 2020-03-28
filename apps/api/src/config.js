const convict = require('convict');

const config = convict({
    env: {
        doc: 'Application environment.',
        format: ['production', 'development', 'test'],
        default: '',
        env: 'NODE_ENV'
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'postgres',
            env: 'POSTGRES_HOST'
        },
        port: {
            doc: 'Database port',
            format: 'port',
            default: 5432,
            env: 'POSTGRES_PORT'
        },
        database: {
            doc: 'Database name',
            format: String,
            default: '',
            env: 'POSTGRES_DB'
        },
        user: {
            doc: 'Database user',
            format: String,
            default: '',
            env: 'POSTGRES_USER'
        },
        password: {
            doc: 'Database password',
            format: String,
            default: '',
            env: 'POSTGRES_PASSWORD'
        }
    },
    port: {
        doc: 'API port',
        format: 'port',
        default: 3001,
        env: 'API_PORT'
    },
    cleverCloud: {
        db: {
            host: {
                doc: 'Database host name/IP',
                format: '*',
                env: 'POSTGRESQL_ADDON_HOST'
            },
            port: {
                doc: 'Database port',
                format: 'port',
                env: 'POSTGRESQL_ADDON_PORT'
            },
            database: {
                doc: 'Database name',
                format: String,
                env: 'POSTGRESQL_ADDON_DB'
            },
            user: {
                doc: 'Database user',
                format: String,
                env: 'POSTGRESQL_ADDON_USER'
            },
            password: {
                doc: 'Database password',
                format: String,
                env: 'POSTGRESQL_ADDON_PASSWORD'
            }
        },
    }
});

config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
