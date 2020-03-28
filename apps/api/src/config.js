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
    authentication: {
        privateKey:  {
            doc: 'Authentication jwt private key',
            format: String,
            default: 'pr1v4t3-k3y',
            env: 'AUTHENTICATION_PRIVATE_KEY'
        },
        secret: {
            doc: 'Authentication cryptography secret',
            format: String,
            default: 's3cr3t',
            env: 'AUTHENTICATION_SECRET'
        },
        expirationTokenDelay: {
            doc: 'Authentication token expiration delay (seconds)',
            format: 'nat',
            default: 3600 * 24,
            env: 'AUTHENTICATION_EXPIRATION_TOKEN_DELAY'
        }
    },
    port: {
        doc: 'API port',
        format: 'port',
        default: 3001,
        env: 'API_PORT'
    },
    mailjet: {
        publicKey: {
            doc: 'Mailjet API public key',
            format: String,
            default: '',
            env: 'MJ_APIKEY_PUBLIC'
        },
        privateKey: {
            doc: 'Mailjet API private key',
            format: String,
            default: '',
            env: 'MJ_APIKEY_PRIVATE'
        }
    }
});

config.validate({ allowed: 'strict' });

module.exports = config.getProperties();
