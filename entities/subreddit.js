'use strict';

class Subreddit {
    constructor(data) {
        this.activeAccounts = data.accounts_active;
        this.subscribers = data.subscribers;

        this.title = data.title;
        this.displayName = data.display_name;
        this.description = data.description;
        this.url = data.url;

        this.NSFW = data.over18;
        this.allowedSubmissions = data.submission_type;
        this.status = data.subreddit_type;

        this.isBanned = data.user_is_banned;
        this.isContributor = data.user_is_contributor;
        this.isModerator = data.user_is_moderator;
        this.isSubscriber = data.user_is_subscriber;
    }
}

module.exports = Subreddit;