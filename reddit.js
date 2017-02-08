'use strict';

var path = require('path'),
    request = require('request'),

    utils = require('./utils.js'),
    filters = require('./filters.js'),
    types = require('./types.js'),

    Account = require('./entities/account.js'),
    Link = require('./entities/link.js'),
    Listing = require('./entities/listing.js'),
    Subreddit = require('./entities/subreddit.js'),
    Preferences = require('./entities/preferences.js'),
    KarmaList = require('./entities/karma-list.js');

class Reddit {
    constructor(config) {
        this.refreshToken = config.refreshToken;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.userAgent = config.userAgent;
    }

    /*
     * BEGIN USER FUNCTIONS
     */

    getMe() {
        return this.authenticatedRequest('/api/v1/me', 'GET')
            .then((account) => {
                return new Account(account);
            });
    }

    getPreferences() {
        return this.authenticatedRequest('/api/v1/me/prefs', 'GET')
            .then((prefs) => {
                return new Preferences(prefs);
            });
    }

    getKarma() {
        return this.authenticatedRequest('/api/v1/me/karma', 'GET')
            .then((karmaList) => {
                return new KarmaList(karmaList);
            });
    }

    /*
     * END USER FUNCTIONS
     */

    /*
    BEGIN POST FUNCTIONS
    */

    getLink(id) {
        return this.authenticatedRequest('/api/info', 'GET', {
            id: types.getFullnameFromTypeAndId('link', id)
        }).then((listing) => {
            return new Link(listing.data.children[0]);
        });
    }

    /*
    END POST FUNCTIONS
    */

    /*
    BEGIN SUBREDDIT FUNCTIONS
    */

    getSubreddit(subreddit) {
        var endpoint = path.join('/r/', subreddit, '/about');

        return this.authenticatedRequest(endpoint, 'GET')
            .then((res) => {
                return new Subreddit(res.data);
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

        return this.authenticatedRequest(endpoint, 'GET', params)
            .then((res) => {
                return new Listing(endpoint, res.data, opts);
            });
    }

    getPreviousPage(listing) {
        return this.authenticatedRequest(listing.endpoint, 'GET', {
                count: 1,
                limit: listing.pageSize,
                before: listing.first
            })
            .then((res) => {
                return new Listing(listing.endpoint, res.data, {
                    pageSize: listing.pageSize,
                    filterSticky: filterSticky
                });
            })
            .catch(console.log);
    }

    getNextPage(listing) {
        return this.authenticatedRequest(listing.endpoint, 'GET',  {
                count: 1,
                limit: listing.pageSize,
                after: listing.last
            })
            .then((res) => {
                return new Listing(listing.endpoint, res.data, {
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
        return this.authenticatedRequest('/api/vote', 'POST', {}, {
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
        return this.authenticatedRequest('/api/save', 'POST', {}, {
            id: types.getFullnameFromTypeAndId(type, id)
        });
    }

    unsave(type, id) {
        return this.authenticatedRequest('/api/unsave', 'POST', {}, {
            id: types.getFullnameFromTypeAndId(type, id)
        });
    }

    /*
    END SAVING FUNCTIONS
    */

    /*
    BEGIN OAUTH FUNCTIONS
    */

    authenticatedRequest(endpoint, method, params, body) {
        return new Promise((resolve, reject) => {
            var validAccessToken = this.accessToken && this.accessToken.expiration > Date.now();

            var promise = validAccessToken ? Promise.resolve() : this.refreshAccessToken();

            promise.then(() => {
                request({
                    url: utils.buildRequestURL(endpoint),
                    qs: params,
                    form: body,
                    method: method,
                    headers: {
                        'user-agent': this.userAgent,
                        Authorization: 'bearer ' + this.accessToken.token
                    },
                }, (err, res, body) => {
                    resolve(JSON.parse(body));
                });
            });
        });
    }

    refreshAccessToken() {
        return new Promise((resolve, reject) => {
            request({
                url: utils.buildAuthURL(),
                method: 'POST',
                headers: {
                    'user-agent': this.userAgent,
                    Authorization: 'Basic ' + new Buffer(this.clientId + ':' + this.clientSecret).toString('base64')
                },
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken
                }
            }, (err, res, token) => {
                token = JSON.parse(token);

                // Set access tokens to expire one minute before their expiration time
                // so it won't ever actually expire after the request has been made but before
                // it is processed by reddit.
                var expiration = Date.now() + token.expires_in - 60;

                this.accessToken = {
                    token: token.access_token,
                    expiration: expiration,
                    scopes: token.scope
                };

                resolve();
            });
        });
    }

    /*
    END OAUTH FUNCTIONS
    */
};

module.exports = Reddit;