var expect = require('chai').expect,
    utils = require('../utils.js');

describe('utils', function() {
    describe('cleanObject', function() {
        it('should remove undfined', function() {
            expect(utils.cleanObject({
                first: 'first',
                second: undefined
            })).to.eql({
                first: 'first'
            });
        });
    });

    describe('camelCaseProperties', function() {
        it('should camelcase object propertoes', function() {
            var original = {
                first_property: 'first',
                object_property: {
                    deep_property: 'deep'
                }
            };

            var actual = utils.camelCaseProperties(original)

            var expected = {
                firstProperty: 'first',
                objectProperty: {
                    deepProperty: 'deep'
                }
            };

            expect(actual).to.eql(expected);
        });

        it('should camelcase object properties inside array', function() {
            var original = [{
                first_object: 'first'
            }, {
                second_object: 'second'
            }];

            var actual = utils.camelCaseProperties(original);

            var expected = [{
                firstObject: 'first'
            }, {
                secondObject: 'second'
            }];

            expect(actual).to.eql(expected);
        });
    });

    describe('buildAuthURL', function() {
        it('should build an URL for authentication', function() {
            var actual = utils.buildAuthURL();
            var expected = 'https://www.reddit.com/api/v1/access_token';

            expect(actual).to.equal(expected);
        });
    });

    describe('buildRequestURL', function() {
        it('should build an URL for requests', function() {
            var actual = utils.buildRequestURL('/endpoint');
            var expected = 'https://oauth.reddit.com/endpoint';

            expect(actual).to.equal(expected);
        });
    });
});
