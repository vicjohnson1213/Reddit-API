'use strict';

var utils = require('../utils.js');

class Account {
    constructor(account) {
        Object.assign(this, utils.camelCaseProperties(account));
    }
}

module.exports = Account;