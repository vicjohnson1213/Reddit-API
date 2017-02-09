'use strict';

var utils = require('../utils.js');

function createSubreddit(subreddit) {
    return utils.camelCaseProperties(subreddit);
}

module.exports = createSubreddit;