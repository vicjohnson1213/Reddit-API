'use strict';

var utils = require('../utils.js');

function createComment(comment) {
    return utils.camelCaseProperties(comment);
}

module.exports = createComment;