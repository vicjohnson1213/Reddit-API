var Post = require('./entities/post.js');

var FULLNAME_TYPES = {
    comment: 't1',
    account: 't2',
    post: 't3',
    message: 't4',
    subreddit: 't5',
    award: 't6',
    promoCampaign: 't8'
};

function getTypeFromFullname(fullname) {
    var kind = fullname.slice(0, 2);
    return getTypeFromKind(kind);
}

function getTypeFromKind(kind) {
    for (type in FULLNAME_TYPES) {
        if (FULLNAME_TYPES[type] === kind) {
            return type;
        }
    }
}

function buildTypeFromKind(kind, data) {
    var type = getTypeFromKind(kind);
    var result;

    switch(type) {
        case 'post':
            result = new Post(data);
            break;
    }

    return result;
}

function buildFullnameFromTypeAndId(type, id) {
    return FULLNAME_TYPES[type] + '_' + id;
}

module.exports.FULLNAME_TYPES = FULLNAME_TYPES;
module.exports.getTypeFromFullname = getTypeFromFullname;
module.exports.getTypeFromKind = getTypeFromKind;
module.exports.buildTypeFromKind = buildTypeFromKind;
module.exports.buildFullnameFromTypeAndId = buildFullnameFromTypeAndId;
