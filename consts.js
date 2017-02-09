var REDDIT_REQUEST_URL = {
    protocol: 'https:',
    slashes: true,
    host: 'oauth.reddit.com',
    pathname: ''
};

var REDDIT_AUTH_URL = {
    protocol: 'https:',
    slashes: true,
    host: 'www.reddit.com',
    pathname: '/api/v1/access_token'
};

var RATE_LIMIT = 60;
var RATE_LIMIT_RESET = 60;

module.exports.REDDIT_REQUEST_URL = REDDIT_REQUEST_URL;
module.exports.REDDIT_AUTH_URL = REDDIT_AUTH_URL;
module.exports.RATE_LIMIT = RATE_LIMIT;
module.exports.RATE_LIMIT_RESET = RATE_LIMIT_RESET;
