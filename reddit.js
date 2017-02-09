'use strict';

var path = require('path'),
    request = require('request'),

    filters = require('./filters.js'),
    oauth = require('./oauth.js'),
    types = require('./types.js'),
    utils = require('./utils.js'),

    account = require('./entities/account.js'),
    comment = require('./entities/comment.js'),
    karmaList = require('./entities/karma-list.js'),
    link = require('./entities/link.js'),
    listing = require('./entities/listing.js'),
    preferences = require('./entities/preferences.js'),
    subreddit = require('./entities/subreddit.js'),
    trophy = require('./entities/trophy.js');

class Reddit {
    constructor(config) {
        oauth.init(config);
    }

    /*
     * BEGIN USER FUNCTIONS
     */

    getMe() {
        return oauth.authenticatedRequest('/api/v1/me', 'GET')
            .then((res) => {
                return account(res);
            });
    }

    getPreferences() {
        return oauth.authenticatedRequest('/api/v1/me/prefs', 'GET')
            .then((res) => {
                return preferences(res);
            });
    }

    // setPreferences(prefs) {
    //     return this.authenticatedRequest('/api/v1/me/prefs', 'PATCH', {}, utils.snakeCaseProperties(prefs))
    //         .then(console.log)
    //         .catch(console.log);
    // }

    getKarma() {
        return oauth.authenticatedRequest('/api/v1/me/karma', 'GET')
            .then((res) => {
                return karmaList(res);
            });
    }

    getTrophies() {
        return oauth.authenticatedRequest('/api/v1/me/trophies', 'GET')
            .then((res) => {
                return res.data.trophies.map((troph) => {
                    return trophy(troph);
                });
            });
    }

    /*
     * END USER FUNCTIONS
     */

    /*
    BEGIN LINK FUNCTIONS
    */

    getLink(id) {
        return oauth.authenticatedRequest('/api/info', 'GET', {
            id: types.getFullnameFromTypeAndId('link', id)
        }).then((res) => {
            return link(res.data.children[0].data);
        });
    }

    /*
    END LINK FUNCTIONS
    */

    /*
    BEGIN COMMENT FUNCTIONS
    */

    getComment(id) {
        return oauth.authenticatedRequest('/api/info', 'GET', {
            id: types.getFullnameFromTypeAndId('comment', id)
        }).then((res) => {
            return comment(res.data.children[0]);
        });
    }

    /*
    END COMMENT FUNCTIONS
    */

    /*
    BEGIN SUBREDDIT FUNCTIONS
    */

    getSubreddit(name) {
        var endpoint = path.join('/r/', name, '/about');

        return oauth.authenticatedRequest(endpoint, 'GET')
            .then((res) => {
                return subreddit(res.data);
            });
    }

    /*
    END POST FUNCTIONS
    */

    /*
    END USER FUNCTIONS
    */

    /*
    BEGIN LISTING FUNCTIONS
    */

    /*
    Possible opts:

    limit: Number, 1-100, limits the number to things returned (default is user preference).
    subreddit: Stirng, The subreddit to get the listing from.  If ommitted (default front).
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    */
    getHot(opts = {}) {
        var params = {
            limit: opts.pageSize
        };

        return this.getListing('/hot', opts, params);
    }

    /*
    Possible opts:

    limit: Number, 1-100, limits the number to things returned (default is user preference).
    subreddit: Stirng, The subreddit to get the listing from.  If ommitted (default front).
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    */
    getNew(opts = {}) {
        var params = {
            limit: opts.pageSize
        };

        return this.getListing('/new', opts, params);
    }

    /*
    Possible opts:

    limit: Number, 1-100, limits the number to things returned (default is user preference).
    subreddit: Stirng, The subreddit to get the listing from.  If ommitted (default front).
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    */
    getRising(opts = {}) {
        var params = {
            limit: opts.pageSize
        };

        return this.getListing('/rising', opts, params);
    }

    /*
    Possible opts:
    
    limit: Number, 1-100, limits the number to things returned (default is user preference).
    subreddit: String, The subreddit to get the listing from.  If ommitted (default front).
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    timeFrame: String, (one of [hour, day, week, month, year, all]) (default subreddit preference).
    */
    getTop(opts = {}) {
        var params = {
            limit: opts.pageSize,
            sort: 'top',
            t: opts.timeFrame
        };

        return this.getListing('/top', opts, params);
    }

    /*
    Possible opts:
    
    limit: Number, 1-100, limits the number to things returned (default is user preference).
    subreddit: String, The subreddit to get the listing from.  If ommitted (default front).
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    timeFrame: String, (one of [hour, day, week, month, year, all]) (default subreddit preference).
    */
    getControversial(opts = {}) {
        var params = {
            limit: opts.pageSize,
            sort: 'controversial',
            t: opts.timeFrame
        };

        return this.getListing('/controversial', opts, params);
    }

    /*
    Possible opts:
     
    limit: Number, 1-100, limits the number of things returned (default is user preference).
    subreddit: String, The subreddit to get the listing from.  If ommitted (default front),
    filterSticky: Boolean, If true, stickied posts/comments will not be returned (default false).
    */
    getListing(endpoint, opts = {}, params = {}) {

        if (opts.subreddit) {
            endpoint = path.join('/r', opts.subreddit, endpoint);
        }

        params = utils.cleanObject(params);

        return oauth.authenticatedRequest(endpoint, 'GET', params)
            .then((res) => {
                return listing(endpoint, res.data, opts);
            });
    }

    getPreviousPage(listing) {
        return oauth.authenticatedRequest(listing.endpoint, 'GET', {
                count: 1,
                limit: listing.pageSize,
                before: listing.first
            })
            .then((res) => {
                return listing(listing.endpoint, res.data, {
                    pageSize: listing.pageSize,
                    filterSticky: filterSticky
                });
            })
            .catch(console.log);
    }

    getNextPage(listing) {
        return oauth.authenticatedRequest(listing.endpoint, 'GET',  {
                count: 1,
                limit: listing.pageSize,
                after: listing.last
            })
            .then((res) => {
                return listing(listing.endpoint, res.data, {
                    pageSize: listing.pageSize,
                    filterSticky: listing.filterSticky
                });
            })
            .catch(console.log);
    }

    /*
    END LISTING FUNCTIONS
    */

    /*
    BEGIN VOTING FUNCTIONS
    */

    /*
    type: one of [comment, post]
    */
    upvote(type, id) {
        return this.vote(type, id, 1);
    }

    /*
    type: one of [comment, post]
    */
    unvote(type, id) {
        return this.vote(type, id, 0);
    }

    /*
    type: one of [comment, post]
    */
    downvote(type, id) {
        return this.vote(type, id, -1);
    }

    /*
    type: one of [comment, post]
    direction: one of [1, 0, -1]
    */
    vote(type, id, direction) {
        return oauth.authenticatedRequest('/api/vote', 'POST', {}, {
            id: types.getFullnameFromTypeAndId(type, id),
            dir: direction
        });
    }

    /*
    END VOTING FUNCTIONS
    */

    /*
    BEGIN SAVING FUNCTIONS
    */

    save(type, id) {
        return oauth.authenticatedRequest('/api/save', 'POST', {}, {
            id: types.getFullnameFromTypeAndId(type, id)
        });
    }

    unsave(type, id) {
        return oauth.authenticatedRequest('/api/unsave', 'POST', {}, {
            id: types.getFullnameFromTypeAndId(type, id)
        });
    }

    /*
    END SAVING FUNCTIONS
    */

    /*
    BEGIN MISC FUNCTIONS
    */

    getScopes() {
        return oauth.authenticatedRequest('/api/v1/scopes', 'GET');
    }

    /*
    END MISC FUNCTIONS
    */
};

module.exports = Reddit;