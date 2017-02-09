var url = require('url'),
    path = require('path'),

    camelCase = require('camelcase'),
    snakeCase = require('snake-case'),
    clone = require('clone'),

    consts = require('./consts.js');

function buildAuthURL() {
    return url.format(consts.REDDIT_AUTH_URL);
}

function buildRequestURL(endpoint) {
    var parts = consts.REDDIT_REQUEST_URL;
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
    return caseProperties(camelCase, thing);
}

function snakeCaseProperties(thing) {
    return caseProperties(snakeCase, thing);
}

function caseProperties(caseFunc, thing) {
    if (thing === undefined || thing === null) return thing;
    
    var prototype = Object.getPrototypeOf(thing);

    if (prototype === Object.prototype) {
        return caseObjectProperties(caseFunc, thing);
    } else if (prototype === Array.prototype) {
        return caseArrayObjectProperties(caseFunc, thing);
    }

    return thing;
}

function caseArrayObjectProperties(caseFunc, arr) {
    return arr.map((thing) => {
        return caseProperties(caseFunc, thing);
    });
}

function caseObjectProperties(caseFunc, object) {
    var newObject = {};

    Object.keys(object).forEach(function(key) {
        newObject[caseFunc(key)] = caseProperties(caseFunc, object[key]);
    });

    return newObject;
}

module.exports.buildAuthURL = buildAuthURL;
module.exports.buildRequestURL = buildRequestURL;
module.exports.cleanObject = cleanObject;
module.exports.camelCaseProperties = camelCaseProperties;
module.exports.snakeCaseProperties = snakeCaseProperties;