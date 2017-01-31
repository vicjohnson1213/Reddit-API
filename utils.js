var url = require('url'),
    path = require('path'),
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
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
            delete obj[prop];
        }
    }
}

module.exports.buildAuthURL = buildAuthURL;
module.exports.buildRequestURL = buildRequestURL;
module.exports.cleanObject = cleanObject;