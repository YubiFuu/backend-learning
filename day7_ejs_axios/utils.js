function paginationMenu(page) {
    // functioncal programming
    const paginationArray = Array.from(
        new Set(
            [
                1,
                2,
                3,
                page - 100,
                page - 10,
                page - 2,
                page - 1,
                page,
                page + 1,
                page + 2,
                page + 10,
                page + 100,
                498,
                499,
                500,
            ].filter((page) => page >= 1 && page <= 500)
        )
    );

    // out of range entfernen
    // duplicates entfernen
    return paginationArray;
}

module.exports = {
    paginationMenu,
};
