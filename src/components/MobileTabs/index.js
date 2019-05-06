import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import mq from "../../theme/mq";

const MobileTabsContainer = styled.div`
  display: none;
  ${mq.mobile} {
    margin-top: 1rem;
    display: flex;
    & div:first-of-type {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    & div:last-child {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`;

const MobileTab = styled.div`
  border: 1px solid #ddd;
  width: 50%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: center;
  ${props =>
    props.active
      ? "background: #eeeeee;"
      : `
        background: #fff;
        &:hover {
            background: #dddddd;
        }
    `};
`;

export const MobileTabs = ({ activeTabId, onTabClick }) => (
  <MobileTabsContainer>
    <MobileTab
      active={activeTabId === "gitemoji"}
      onClick={() => onTabClick("gitemoji")}
    >
      Git Emoji
    </MobileTab>
    <MobileTab
      active={activeTabId === "commitconv"}
      onClick={() => onTabClick("commitconv")}
    >
      Convention
    </MobileTab>
  </MobileTabsContainer>
);

MobileTabs.defaultProps = {
  activeTabId: "gitemoji"
};

MobileTabs.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  activeTabId: PropTypes.oneOf(["gitemoji", "commitconv"])
};
