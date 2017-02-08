'use strict';

var utils = require('../utils.js');

class Subreddit {
    constructor(data) {
        Object.assign(this, utils.camelCaseProperties(data));
    }
}

module.exports = Subreddit;