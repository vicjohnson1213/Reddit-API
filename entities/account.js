'use strict';

var utils = require('../utils.js');

function createAccount(res) {
    return utils.camelCaseProperties(res);
}

module.exports = createAccount;