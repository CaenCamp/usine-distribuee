const get = require('lodash.get');

const permissions = require('./permissions');

const isFunction = value => value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function);

const isStatusChangeAuthorized = (role, from, to) => {
    const validator = get(permissions, `${role}.${from.status}.${to.status}`);
    if(!validator){
        return false;
    }
    if(isFunction(validator)){
        return validator(from, to);
    }
    return !!validator;
}

module.exports = {
    isStatusChangeAuthorized,
};
