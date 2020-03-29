const get = require('lodash.get');

const permissions = require('./permissions');

const isFunction = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function);

const isAuthorized = (user, from, to) => {
    const validator = get(permissions, `${user.role}.${from.status}.${to.status}`);
    if(!validator){
        return false;
    }
    if(isFunction(validator)){
        return validator(user, from, to);
    }
    return !!validator;
}

module.exports = {
    isAuthorized,
};
