const fetch = require('node-fetch').default

/**
 * Fetch a list of articles from server,
 */
async function getHallaArticles() {
    const BASE_ENDPOINT = "http://localhost:5000/api/gatsby/articles";

    // Get list of published and active articles
    const listEndpoint = new URL(BASE_ENDPOINT);
    const listResults = await (await fetch(listEndpoint.toString())).json();
    return Object.values(listResults);
}


exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    // Arbitrary node type constant
    const ARTICLE_TYPE = 'ArticleHallaPage';

    // Get articles
    const articleResults = await getHallaArticles();

    // Convert raw article results to nodes
    for (const article of articleResults) {
        actions.createNode({
            ...article,
            id: createNodeId(`${ARTICLE_TYPE}-${article.id}`),
            parent: null,
            children: [],
            internal: {
                type: ARTICLE_TYPE,
                contentDigest: createContentDigest(article)
            }
        })
    }
};


/**
 * Fetch a list of articles from server, with excerpts...this function is written in the same vein as the getWikiProgrammingBooks function
 * found in this tutorial https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-source-plugin-in-gatsby
 * but because my api is simple will not be going this route
 */
// async function getHallaArticlesInPieces() {
//     const BASE_ENDPOINT = "http://localhost:5000/api/gatsby/articles";
//     const listEndpoint = new URL(BASE_ENDPOINT);
//     listEndpoint.searchParams.append('active', 'true')
//     listEndpoint.searchParams.append('published', 'true')
//     const listResults = await (await fetch(listEndpoint.toString())).json();
//     const articleIds = listResults.id.map((listing) => listing.id);

//     const extractEndpoint = new URL(BASE_ENDPOINT);
//     extractEndpoint.searchParams.append("pageids", pageIds.join("|"));
//     extractEndpoint.searchParams.append("prop", "extracts|info");
//     extractEndpoint.searchParams.append("exintro", "");
//     extractEndpoint.searchParams.append("explaintext", "");
//     extractEndpoint.searchParams.append("inprop", "url");
//     const articleResult = await (await fetch(extractEndpoint.toString())).json();
//     return Object.values(articleResult)
// }