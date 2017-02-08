'use strict';

var utils = require('../utils.js');

class Preferences {
    constructor(prefs) {
        Object.assign(this, utils.camelCaseProperties(prefs));
    }
}

module.exports = Preferences;