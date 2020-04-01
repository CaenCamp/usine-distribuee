const get = require('lodash.get');

const permissions = require('./permissions');

const isFunction = value =>
    value &&
    (Object.prototype.toString.call(value) === '[object Function]' ||
        'function' === typeof value ||
        value instanceof Function);

const isAuthorized = (user, from, to) => {
    let authTo = to;
    if (!authTo.status) {
        authTo.status = from.status;
    }
    const validator = get(
        permissions,
        `${user.role}.${from.status}.${authTo.status}`
    );
    if (!validator) {
        return false;
    }
    if (isFunction(validator)) {
        return validator(user, from, authTo);
    }
    return !!validator;
};

module.exports = {
    isAuthorized
};
