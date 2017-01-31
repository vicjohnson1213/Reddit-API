'use strict';

class Post {
    constructor(data) {
        this.id = data.id;

        this.author = data.author;
        this.title = data.title;
        this.body = data.selftext_html;
        this.subreddit = data.subreddit;
        this.subredditId = data.subreddit_id;

        this.url = data.url;
        this.domain = data.domain;

        this.upvoted = data.likes;
        this.saved = data.saved;
        this.gilded = data.gilded

        this.upvotes = data.ups;
        this.downvotes = data.downs;
        this.score = data.score;

        this.isSelf = data.is_self;
        this.isSticky = data.stickied;
        this.edited = data.edited;
        this.hidden = data.hidden;
        this.locked = data.locked;
        this.archived = data.archived;
        this.contestMode = data.contest_mode;
    }
}

module.exports = Post;