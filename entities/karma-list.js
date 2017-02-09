'use strict';

function createKarmaList(res) {
    var karma = {
        totalCommentKarma: 0,
        totalLinkKarma: 0,
        breakdown: {}
    }

    res.data.forEach((subreddit) => {
        karma.totalCommentKarma += subreddit.comment_karma;
        karma.totalLinkKarma += subreddit.link_karma;

        karma.breakdown[subreddit.sr] = {
            commentKarma: subreddit.comment_karma,
            postKarma: subreddit.link_karma
        };
    });

    return karma;
}

module.exports = createKarmaList;