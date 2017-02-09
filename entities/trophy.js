'use strict';

var utils = require('../utils.js');

function createTrophy(trophy) {
    return utils.camelCaseProperties(trophy);
}

module.exports = createTrophy;