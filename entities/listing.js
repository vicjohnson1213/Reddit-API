'use strict';

var types = require('../types.js');

function listing(endpoint, data, opts) {
    return {
        first: data.before,
        last: data.after,
        endpoint: endpoint,
        pageSize: opts.pageSize,
        filterSticky: opts.filterSticky,

        children: data.children.map((thing) => {
            return types.buildTypeFromKind(thing.kind, thing.data);
        }).filter((thing) => {
            return opts.filterSticky ? opts.filterSticky : !thing.stickied;
        })
    };
}

module.exports = listing;