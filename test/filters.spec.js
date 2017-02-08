var expect = require('chai').expect,

    filters = require('../filters.js');

describe('filters', function() {
    describe('filterStickied', function() {
        it('should filter stickied links', function() {
            var original = {
                children: [{
                    stickied: false
                }, {
                    stickied: true
                }]
            };

            var actual = filters.filterStickied(original);

            expect(actual.children).to.have.lengthOf(1);
        });
    });
});