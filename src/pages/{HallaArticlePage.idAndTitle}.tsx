import { graphql } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

export default function BookPageTemplate({ data: { bookWikiPage } }: any) {
    const { title, extract, fullurl } = bookWikiPage;
    return (
        <Layout>
            <Seo title={title} />
            <h1>{title} </h1>
            <blockquote> {extract} </blockquote>

            <i> This article uses material from the Wikipedia article <a href={fullurl} target="_blank" rel="noreferrer" > "{title}" </a>, which is released under the <a href="https:/ / creativecommons.org / licenses / by - sa / 3.0 / ">Creative Commons Attribution-Share-Alike License 3.0</a>.</i>
        </Layout>
    );
}


export const pageQuery = graphql`
  query ($id: String!) 

    {
  bookWikiPage(id: {eq: $id}, title: {eq: "$title"}) {
    title
    extract
    fullurl
  }
}



`;