# Reddit Wrapper

## Types

| **type prefix**   | **Entity**       |
|:------------------|:-----------------|
| `t1_`             | Comment          |
| `t2_`             | Account          |
| `t3_`             | Link/Post        |
| `t4_`             | Message          |
| `t5_`             | Subreddit        |
| `t6_`             | Award            |
| `t8_`             | PromoCampaign    |

## Entities

### Account

**Properties:**

| **type**       | **name**                 | **description** |
|:---------------|:-------------------------|:----------------|
| `int`          | `comment_karma`          | user's comment karma |
| `boolean`      | `has_mail`               | user has unread mail? null if not your account |
| `boolean`      | `has_mod_mail`           | user has unread mod mail? null if not your account |
| `boolean`      | `has_verified_email`     | user has provided an email address and got it verified? |
| `String`       | `id`                     | ID of the account; prepend `t2_` to get fullname |
| `int`          | `inbox_count`            | Number of unread messages in the inbox. Not present if not your account |
| `boolean`      | `is_friend`              | whether the logged-in user has this user set as a friend |
| `boolean`      | `is_gold`                | reddit gold status |
| `boolean`      | `is_mod`                 | whether this account moderates any subreddits |
| `int`          | `link_karma`             | user's link karma |
| `String`       | `modhash`                | current modhash. not present if not your account |
| `String`       | `name`                   | The username of the account in question.  This attribute overrides the superclass's `name` attribute.  Do not confuse an account's `name` which is the account's username with a thing's `name` which is the thing's FULLNAME. |
| `boolean`      | `over_18`                | whether this account is set to be over 18 |
| `long`    | `created`                | the time of creation in local epoch-second format. ex: `1331042771.0` |
| `long`    | `created_utc`            | the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction. |

### Subreddit

**Properties:**

| **type**  | **name**                 | **description** |
|:----------|:-------------------------|:----------------|
| `int`     | `accounts_active`        | number of users active in last 15 minutes |
| `int`     | `comment_score_hide_mins`| number of minutes the subreddit initially hides comment scores |
| `String`  | `description`            | sidebar text |
| `String`  | `description_html`       | sidebar text, escaped HTML format |
| `String`  | `display_name`           | human name of the subreddit |
| `String`  | `header_img`             | full URL to the header image, or null |
| `array`   | `header_size`            | width and height of the header image, or null |
| `String`  | `header_title`           | description of header image shown on hover, or null |
| `boolean` | `over18`                 | whether the subreddit is marked as NSFW |
| `String`  | `public_description`     | Description shown in subreddit search results? |
| `boolean` | `public_traffic`         | whether the subreddit's traffic page is publicly-accessible |
| `long`    | `subscribers`            | the number of redditors subscribed to this subreddit |
| `String`  | `submission_type`        | the type of submissions the subreddit allows - one of "any", "link" or "self" |
| `String`   | `submit_link_label`      | the subreddit's custom label for the submit link button, if any |
| `String`   | `submit_text_label`      | the subreddit's custom label for the submit text button, if any |
| `String`  | `subreddit_type`         | the subreddit's type - one of "public", "private", "restricted", or in very special cases "gold_restricted" or "archived" |
| `String`  | `title`                  | title of the main page |
| `String`  | `url`                    | The relative URL of the subreddit.  Ex: "/r/pics/" |
| `boolean` | `user_is_banned`         | whether the logged-in user is banned from the subreddit |
| `boolean` | `user_is_contributor`         | whether the logged-in user is an approved submitter in the subreddit |
| `boolean` | `user_is_moderator`         | whether the logged-in user is a moderator of the subreddit |
| `boolean` | `user_is_subscriber`         | whether the logged-in user is subscribed to the subreddit |

### Post

**Properties:**

| **type**  | **name**                 | **description** |
|:----------|:-------------------------|:----------------|
| `String`  | `author`                 | the account name of the poster. null if this is a promotional link |
| `String`  | `author_flair_css_class` | the CSS class of the author's flair.  subreddit specific |
| `String`  | `author_flair_text`      | the text of the author's flair.  subreddit specific |
| `boolean` | `clicked`                | probably always returns false |
| `String`  | `domain`                 | the domain of this link.  Self posts will be `self.<subreddit>` while other examples include `en.wikipedia.org` and `s3.amazon.com` |
| `boolean` | `hidden`                 | true if the post is hidden by the logged in user.  false if not logged in or not hidden. |
| `boolean` | `is_self`                | true if this link is a selfpost |
| `boolean` | `likes`                  | how the logged-in user has voted on the link - `True` = upvoted, `False` = downvoted, `null` = no vote |
| `String`  | `link_flair_css_class`   | the CSS class of the link's flair. |
| `String`  | `link_flair_text`        | the text of the link's flair. |
| `boolean` | `locked`                 | whether the link is locked (closed to new comments) or not. |
| `Object`  | `media`                  | Used for streaming video. Detailed information about the video and it's origins are placed here |
| `Object`  | `media_embed`            | Used for streaming video. Technical embed specific information is found here. |
| `int`     | `num_comments`           | the number of comments that belong to this link. includes removed comments. |
| `boolean` | `over_18`                | true if the post is tagged as NSFW.  False if otherwise |
| `String`  | `permalink`              | relative URL of the permanent link for this link |
| `boolean` | `saved`                  | true if this post is saved by the logged in user |
| `int`     | `score`                  | the net-score of the link.  **note:** A submission's score is simply the number of upvotes minus the number of downvotes. If five users like the submission and three users don't it will have a score of 2. Please note that the vote numbers are not "real" numbers, they have been "fuzzed" to prevent spam bots etc. So taking the above example, if five users upvoted the submission, and three users downvote it, the upvote/downvote numbers may say 23 upvotes and 21 downvotes, or 12 upvotes, and 10 downvotes. The points score is correct, but the vote totals are "fuzzed".|
| `String`  | `selftext`               | the raw text.  this is the unformatted text which includes the raw markup characters such as `**` for bold. `<`, `>`, and `&` are escaped. Empty if not present. |
| `String`  | `selftext_html`          | the formatted escaped HTML text.  this is the HTML formatted version of the marked up text.  Items that are boldened by `**` or `***` will now have `<em>` or `***` tags on them. Additionally, bullets and numbered lists will now be in HTML list format. ***NOTE:*** The HTML string will be escaped.  You must unescape to get the raw HTML. Null if not present. |
| `String`  | `subreddit`              | subreddit of thing excluding the /r/ prefix. "pics" |
| `String`  | `subreddit_id`           | the id of the subreddit in which the thing is located |
| `String`  | `thumbnail`              | full URL to the thumbnail for this link; "self" if this is a self post; "image" if this is a link to an image but has no thumbnail; "default" if a thumbnail is not available|
| `String`  | `title`                  | the title of the link. may contain newlines for some reason |
| `String`  | `url`                    | the link of this post.  the permalink if this is a self-post |
| `long`    | `edited`                 | Indicates if link has been edited. Will be the edit timestamp if the link has been edited and return false otherwise. https://github.com/reddit/reddit/issues/581 |
| `String`  | `distinguished`          | to allow determining whether they have been distinguished by moderators/admins. `null` = not distinguished. `moderator` = the green [M]. `admin` = the red [A]. `special` = various other special distinguishes http://bit.ly/ZYI47B|
| `boolean` | `stickied`               | true if the post is set as the sticky in its subreddit. |
| `int`     | `ups`                    | the number of upvotes. (includes own) |
| `int`     | `downs`                  | the number of downvotes. (includes own) |
| `Boolean` | `likes`                  | `true` if thing is liked by the user, `false` if thing is disliked, `null` if the user has not voted or you are not logged in. Certain languages such as Java may need to use a boolean wrapper that supports null assignment.|
| `long`    | `created`                | the time of creation in local epoch-second format. ex: `1331042771.0` |
| `long`    | `created_utc`            | the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction. |

### Comment

**Properties:**

| **type**  | **name**                 | **description** |
|:----------|:-------------------------|:----------------|
| `String`  | `approved_by`            | who approved this comment. null if nobody or you are not a mod |
| `String`  | `author`                 | the account name of the poster |
| `String`  | `author_flair_css_class` | the CSS class of the author's flair.  subreddit specific |
| `String`  | `author_flair_text`      | the text of the author's flair.  subreddit specific |
| `String`  | `banned_by`              | who removed this comment. null if nobody or you are not a mod |
| `String`  | `body`                   | the raw text.  this is the unformatted text which includes the raw markup characters such as `**` for bold. `<`, `>`, and `&` are escaped. |
| `String`  | `body_html`              | the formatted HTML text as displayed on reddit. For example, text that is emphasised by `*` will now have `<em>` tags wrapping it. Additionally, bullets and numbered lists will now be in HTML list format. **NOTE:** The HTML string will be escaped. You must unescape to get the raw HTML. |
| `special` | `edited`                 | `false` if not edited, edit date in UTC epoch-seconds otherwise. **NOTE:** for some old edited comments on reddit.com, this will be set to `true` instead of edit date. |
| `int`     | `gilded`                 | the number of times this comment received reddit gold |
| `boolean` | `likes`                  | how the logged-in user has voted on the comment - `True` = upvoted, `False` = downvoted, `null` = no vote |
| `String`  | `link_author`            | present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the author of the parent link |
| `String`  | `link_id`                | ID of the link this comment is in |
| `String`  | `link_title`             | present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the title of the parent link |
| `String`  | `link_url`             | present if the comment is being displayed outside its thread (user pages, `/r/subreddit/comments/.json`, etc.). Contains the URL of the parent link |
| `int`     | `num_reports`            | how many times this comment has been reported, null if not a mod |
| `String`  | `parent_id`              | ID of the thing this comment is a reply to, either the link or a comment in it |
| `List<thing>` | `replies`            | A list of replies to this comment |
| `boolean` | `saved`                  | true if this post is saved by the logged in user |
| `int` | `score`           | the net-score of the comment |
| `boolean` | `score_hidden`           | Whether the comment's score is currently hidden. |
| `String`  | `subreddit`              | subreddit of thing excluding the /r/ prefix. "pics" |
| `String`  | `subreddit_id`           | the id of the subreddit in which the thing is located |
| `String`  | `distinguished`          | to allow determining whether they have been distinguished by moderators/admins. `null` = not distinguished. `moderator` = the green [M]. `admin` = the red [A]. `special` = various other special distinguishes http://redd.it/19ak1b|
| `int`     | `ups`                    | the number of upvotes. (includes own) |
| `int`     | `downs`                  | the number of downvotes. (includes own) |
| `Boolean` | `likes`                  | `true` if thing is liked by the user, `false` if thing is disliked, `null` if the user has not voted or you are not logged in. Certain languages such as Java may need to use a boolean wrapper that supports null assignment.|
| `long`    | `created`                | the time of creation in local epoch-second format. ex: `1331042771.0` |
| `long`    | `created_utc`            | the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction. |

### Message

**Properties:**

| **type**  | **name**                 | **description** |
|:----------|:-------------------------|:----------------|
| `String`  | `author`                 |  |
| `String`  | `body`                   | the message itself |
| `String`  | `body_html`              | the message itself with HTML formatting |
| `String`  | `context`                | if the message is a comment, then the permalink to the comment with `?context=3` appended to the end, otherwise an empty string |
| `Message`?| `first_message`          | either null or the first message's ID represented as base 10 (wtf) |
| `String`  | `first_message_name`     | either null or the first message's fullname |
| `boolean` | `likes`                  | how the logged-in user has voted on the message - `True` = upvoted, `False` = downvoted, `null` = no vote |
| `String`  | `link_title`             | if the message is actually a comment, contains the title of the thread it was posted in |
| `String`  | `name`                   | ex: "t4_8xwlg" |
| `boolean` | `new`                    | unread?  not sure |
| `String`  | `parent_id`              | null if no parent is attached |
| `String`  | `replies`                | Again, an empty string if there are no replies. |
| `String`  | `subject`                | subject of message |
| `String`  | `subreddit`              | null if not a comment. |
| `boolean` | `was_comment`            |  |
| `long`    | `created`                | the time of creation in local epoch-second format. ex: `1331042771.0` |
| `long`    | `created_utc`            | the time of creation in UTC epoch-second format. Note that neither of these ever have a non-zero fraction. |