var expect = require('chai').expect,
    sinon = require('sinon'),

    Account = require('../entities/account.js'),
    Preferences = require('../entities/preferences.js'),
    KarmaList = require('../entities/karma-list.js'),
    Reddit = require('../reddit.js');

describe('reddit', function() {
    describe('user functions', function() {
        var reddit = new Reddit({});

        before(function() {
            sinon.stub(reddit, 'authenticatedRequest')
                .returns(Promise.resolve({
                    data: []
                }));
        });

        after(function() {
            reddit.authenticatedRequest.restore();
        });

        describe('getMe', function() {
            it('should get the user', function() {
                reddit.getMe().then((result) => {
                    expect(result).to.be.instanceof(Account);
                });
            });
        });

        describe('getPreferences', function() {
            it('should get the user preferences', function() {
                reddit.getPreferences()
                    .then((result) => {
                        expect(result).to.be.instanceof(Preferences);
                    });
            });
        });

        describe('getKarma', function() {
            it('should get the karma breakdown', function() {
                reddit.getKarma()
                    .then((result) => {
                        expect(result).to.be.instanceof(KarmaList);
                    });
            });
        });
    });
});