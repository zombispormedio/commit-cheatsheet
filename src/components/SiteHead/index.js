import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export const SiteHead = ({ subtitle, fixedTitle }) => (
  <StaticQuery
    query={graphql`
      query MetadataQuery {
        site {
          siteMetadata {
            title
            author
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          title,
          author,
          description,
          keywords = []
        }
      }
    }) => {
      return (
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <link rel="author" href="humans.txt" />
          {/* Search Engine */}
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords.join(",")} />
          <meta name="author" content={author} />
        </Helmet>
      );
    }}
  />
);