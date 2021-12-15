const fetch = require('node-fetch').default

/**
 * Fetch a list of computer books from Wikipedia, with excerpts
 */
async function getWikiProgrammingBooks() {
    const BASE_ENDPOINT = "https://en.wikipedia.org/w/api.php?action=query&format=json&utf8=1&redirects=1";

    // Get list of books
    const listEndpoint = new URL(BASE_ENDPOINT);
    listEndpoint.searchParams.append('list', 'categorymembers');
    listEndpoint.searchParams.append("cmtitle", "Category:Computer_programming_books");
    listEndpoint.searchParams.append("cmlimit", "10");
    const listResults = await (await fetch(listEndpoint.toString())).json();


    // Extract out the page IDs from the list
    const pageIds = listResults.query.categorymembers.map((listing) => listing.pageid);

    // Fetch details for page IDs
    const extractEndpoint = new URL(BASE_ENDPOINT);
    extractEndpoint.searchParams.append("pageids", pageIds.join("|"));
    extractEndpoint.searchParams.append("prop", "extracts|info");
    extractEndpoint.searchParams.append("exintro", "");
    extractEndpoint.searchParams.append("explaintext", "");
    extractEndpoint.searchParams.append("inprop", "url");

    const bookResult = await (await fetch(extractEndpoint.toString())).json();

    return Object.values(bookResult.query.pages);
}

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    // Arbitrary node type constant
    const BOOK_TYPE = 'BookWikiPage';

    // Get books
    const bookResults = await getWikiProgrammingBooks();

    // Convert raw book results to nodes
    for (const book of bookResults) {
        actions.createNode({
            ...book,
            id: createNodeId(`${BOOK_TYPE}-${book.pageid}`),
            parent: null,
            children: [],
            internal: {
                type: BOOK_TYPE,
                contentDigest: createContentDigest(book)
            }
        })
    }
};