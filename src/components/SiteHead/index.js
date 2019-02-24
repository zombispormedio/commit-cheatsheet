import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

const SiteHead = ({
  siteInformation: { title, author, description, keywords = [] }
}) => (
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

SiteHead.defaultProps = {
  siteInformation: {}
};

SiteHead.propTypes = {
  siteInformation: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string)
  })
};

export default SiteHead;

export const query = graphql`
  fragment SiteInformation on Site {
    siteMetadata {
      title
      author
      description
    }
  }
`;
