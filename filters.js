function filterStickied(listing) {
    listing.children = listing.children.filter((child) => {
        return !child.isSticky;
    });
}

module.exports.filterStickied = filterStickied;