function filterStickied(listing) {
    listing.children = listing.children.filter((child) => {
        return !child.stickied;
    });

    return listing;
}

module.exports.filterStickied = filterStickied;