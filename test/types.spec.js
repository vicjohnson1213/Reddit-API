var expect = require('chai').expect,

    types = require('../types.js'),

    Link = require('../entities/link.js'),
    Subreddit = require('../entities/subreddit.js');

describe('types', function() {
    describe('getTypeFromFullname', function() {
        it('should get type from fullname', function() {
            expect(types.getTypeFromFullname('t1_thing')).to.equal('comment');
            expect(types.getTypeFromFullname('t2_thing')).to.equal('account');
            expect(types.getTypeFromFullname('t3_thing')).to.equal('link');
            expect(types.getTypeFromFullname('t4_thing')).to.equal('message');
            expect(types.getTypeFromFullname('t5_thing')).to.equal('subreddit');
            expect(types.getTypeFromFullname('t6_thing')).to.equal('award');
            expect(types.getTypeFromFullname('t8_thing')).to.equal('promoCampaign');
        });
    });

    describe('getTypeFromKind', function() {
        it('should get type from kind', function() {
            expect(types.getTypeFromKind('t1')).to.equal('comment');
            expect(types.getTypeFromKind('t2')).to.equal('account');
            expect(types.getTypeFromKind('t3')).to.equal('link');
            expect(types.getTypeFromKind('t4')).to.equal('message');
            expect(types.getTypeFromKind('t5')).to.equal('subreddit');
            expect(types.getTypeFromKind('t6')).to.equal('award');
            expect(types.getTypeFromKind('t8')).to.equal('promoCampaign');
        });
    });

    describe('getFullnameFromTypeAndId', function() {
        it('should get fullname from type and id', function() {
            expect(types.getFullnameFromTypeAndId('comment', 'id')).to.equal('t1_id');
            expect(types.getFullnameFromTypeAndId('account', 'id')).to.equal('t2_id');
            expect(types.getFullnameFromTypeAndId('link', 'id')).to.equal('t3_id');
            expect(types.getFullnameFromTypeAndId('message', 'id')).to.equal('t4_id');
            expect(types.getFullnameFromTypeAndId('subreddit', 'id')).to.equal('t5_id');
            expect(types.getFullnameFromTypeAndId('award', 'id')).to.equal('t6_id');
            expect(types.getFullnameFromTypeAndId('promoCampaign', 'id')).to.equal('t8_id');
        });
    });

    describe('buildTypeFromKind', function() {
        it('should build type from kind', function() {
            expect(types.buildTypeFromKind('t3', {})).to.be.instanceof(Link);
            expect(types.buildTypeFromKind('t5', {})).to.be.instanceof(Subreddit);
        });
    });
});