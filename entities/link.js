'use strict';

var utils = require('../utils.js');

function createLink(res) {
    res = res.data;

    var link = utils.camelCaseProperties(res);

    link.upvoted = link.likes === 1;
    link.downvoted = link.likes === -1;

    return link;
}

module.exports = createLink;