'use strict';

var utils = require('../utils.js');

class Link {
    constructor(link) {
        link = link.data;

        Object.assign(this, utils.camelCaseProperties(link));

        this.upvoted = this.likes === 1;
        this.downvoted = this.likes === -1;
    }
}

module.exports = Link;