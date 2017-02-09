'use strict';

var utils = require('../utils.js');

function createPreferences(prefs) {
    return utils.camelCaseProperties(prefs);
}

module.exports = createPreferences;