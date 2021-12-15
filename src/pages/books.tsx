import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../styles/books.css"
export default function BookListingsPageTemplate({ data: { allBookWikiPage } }: any ) {
    return (
        <Layout>
            <Seo title="Programming Books Listing" />
            <p>Here are some computer programming books that have their own Wikipedia entries:</p>

            {allBookWikiPage.edges.map((edge: any) => {
                const node = edge.node;
                return (
                    <details key={node.title}>
                        <summary>{node.title}</summary>

                        <div className="details-body">
                            <p>{node.extract}</p>
                            <div className="links">
                                <Link to={node.gatsbyPath}>Internal Page</Link>
                                <a rel="noreferrer" href={node.fullurl}>Wikipedia Page</a>
                            </div>
                        </div>
                    </details>
                )
            })}
        </Layout>
    );
}

export const pageQuery = graphql`
  query {
    allBookWikiPage {
      edges {
        node {
          title
          extract
          gatsbyPath(filePath: "/{BookWikiPage.title}")
          fullurl
        }
      }
    }
  }
`;