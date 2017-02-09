'use strict';

var request = require('request'),

    consts = require('./consts.js'),
    utils = require('./utils.js'),

    rateLimitUsed = 0,

    credentials,
    rateLimitPromise,
    refreshPormise;

function init(creds) {
    credentials = creds;
}

function checkAccessToken() {
    var validAccessToken = credentials.accessToken && credentials.accessToken.expiration > Date.now();

    if (!validAccessToken && !refreshPormise) {
        refreshAccessToken();
    }
}

function authenticatedRequest(endpoint, method, params, body) {
    checkAccessToken();
    rateLimitUsed++;

    var tmp = rateLimitUsed;

    if (rateLimitUsed >= consts.RATE_LIMIT) {
        rateLimitPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                rateLimitUsed = 0;
                resolve();
            }, consts.RATE_LIMIT_RESET * 1000);
        });
    }

    return new Promise((resolve, reject) => {
        Promise.all([refreshPormise, rateLimitPromise]).then(() => {
            request({
                url: utils.buildRequestURL(endpoint),
                qs: params,
                form: body,
                method: method,
                headers: {
                    'user-agent': credentials.userAgent,
                    Authorization: 'bearer ' + credentials.accessToken.token
                },
            }, (err, res, body) => {
                resolve(JSON.parse(body));
            });
        });
    });
}

function refreshAccessToken() {
    refreshPormise = new Promise((resolve, reject) => {
        request({
            url: utils.buildAuthURL(),
            method: 'POST',
            headers: {
                'user-agent': credentials.userAgent,
                Authorization: 'Basic ' + new Buffer(credentials.clientId + ':' + credentials.clientSecret).toString('base64')
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: credentials.refreshToken
            }
        }, (err, res, token) => {
            token = JSON.parse(token);

            // Set access tokens to expire one minute before their expiration time
            // so it won't ever actually expire after the request has been made but before
            // it is processed by reddit.
            var expiration = Date.now() + token.expires_in - 60;

            credentials.accessToken = {
                token: token.access_token,
                expiration: expiration,
                scopes: token.scope
            };

            resolve();
            refreshPormise = null;
        });
    });
}

module.exports.init = init;
module.exports.authenticatedRequest = authenticatedRequest;
module.exports.refreshAccessToken = refreshAccessToken;