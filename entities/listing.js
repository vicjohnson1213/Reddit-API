'use strict';

var types = require('../types.js');

class Listing {
    constructor(endpoint, data, opts) {
        this.first = data.before;
        this.last = data.after;

        this.endpoint = endpoint;
        this.pageSize = opts.pageSize;
        this.filterSticky = opts.filterSticky;

        this.children = data.children.map((thing) => {
            return types.buildTypeFromKind(thing.kind, thing.data);
        });

        if (this.filterSticky) {
            this.children = this.children.filter((thing) => {
                return !thing.stickied;
            });
        }
    }
}

module.exports = Listing;