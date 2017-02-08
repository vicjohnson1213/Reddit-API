var url = require('url'),
    path = require('path'),

    camelCase = require('camelcase'),
    clone = require('clone'),

    config = require('./config');

function buildAuthURL() {
    return url.format(config.REDDIT_AUTH_URL);
}

function buildRequestURL(endpoint) {
    var parts = config.REDDIT_REQUEST_URL;
    var pathname = path.join(parts.pathname, endpoint);

    return url.format(Object.assign({}, parts, { pathname: endpoint }));
}

function cleanObject(obj) {
    var newObj = clone(obj);

    for (var prop in newObj) {
        if (newObj.hasOwnProperty(prop) && newObj[prop] === undefined) {
            delete newObj[prop];
        }
    }

    return newObj
}

function camelCaseProperties(thing) {
    if (thing === undefined || thing === null) return thing;
    
    var prototype = Object.getPrototypeOf(thing);

    if (prototype === Object.prototype) {
        return camelCaseObjectProperties(thing);
    } else if (prototype === Array.prototype) {
        return camelCaseArrayObjectProperties(thing);
    }

    return thing;
}

function camelCaseArrayObjectProperties(arr) {
    return arr.map(camelCaseProperties);
}

function camelCaseObjectProperties(object) {
    var newObject = {};

    Object.keys(object).forEach(function(key) {
        newObject[camelCase(key)] = camelCaseProperties(object[key]);
    });

    return newObject;
}

module.exports.buildAuthURL = buildAuthURL;
module.exports.buildRequestURL = buildRequestURL;
module.exports.cleanObject = cleanObject;
module.exports.camelCaseProperties = camelCaseProperties;