import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ToastContainer } from "react-toastify";
import { Cheatsheet, MobileTabs } from "../components";
import SiteHead from "../components/SiteHead";
import GitEmoji from "../components/GitEmoji";
import CommitConvention from "../components/CommitConvention";

const CommitCheatsheetPage = ({
  data: {
    site: { siteMetadata },
    allContentJson: {
      edges: [
        {
          node: { gitemoji, convention }
        }
      ]
    }
  }
}) => {
  const [activeTabId, setActiveTabId] = useState("gitemoji");
  const onTabClick = useCallback(id => setActiveTabId(id));
  return (
    <Cheatsheet>
      <SiteHead siteInformation={siteMetadata} />
      <MobileTabs activeTabId={activeTabId} onTabClick={onTabClick} />
      <GitEmoji active={activeTabId === "gitemoji"} {...gitemoji} />
      <CommitConvention active={activeTabId === "commitconv"} {...convention} />
      <ToastContainer autoClose={2000} newestOnTop />
    </Cheatsheet>
  );
};

CommitCheatsheetPage.propTypes = {
  data: PropTypes.shape({
    allContentJson: PropTypes.shape({
      edges: PropTypes.array
    })
  }).isRequired
};

export default CommitCheatsheetPage;

export const query = graphql`
  query IndexQuery {
    site {
      ...SiteInformation
    }

    allContentJson {
      edges {
        node {
          ...GitEmoji
          ...CommitConvention
        }
      }
    }
  }
`;
