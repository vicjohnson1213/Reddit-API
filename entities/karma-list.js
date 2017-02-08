'use strict';

class KarmaList {
    constructor(data) {
        this.totalCommentKarma = 0;
        this.totalLinkKarma = 0;
        this.breakdown = {};

        data.data.forEach((subreddit) => {
            this.totalCommentKarma += subreddit.comment_karma;
            this.totalLinkKarma += subreddit.link_karma;

            this.breakdown[subreddit.sr] = {
                commentKarma: subreddit.comment_karma,
                postKarma: subreddit.link_karma
            };
        });
    }
}

module.exports = KarmaList;