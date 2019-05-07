import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import mq from "../../theme/mq";

const ConventionWrapper = styled.ul`
  strong {
    cursor: pointer;
  }

  ${mq.mobile} {
    display: ${props => (props.active ? "block" : "none")};
    padding-bottom: 2rem;
    padding-top: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    li {
      font-size: 1.3em;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ddd;
      strong {
        font-size: 1.5em;
      }
      .dots {
        display: none;
      }

      .description {
        margin-left: 0.5rem;
      }
    }

    li:last-child {
      border-bottom: none;
    }
  }
`;

const CommitConvention = ({ items, active }) => (
  <ConventionWrapper active={active}>
    {items.map(({ title, description }) => (
      <li key={title}>
        <CopyToClipboard text={title} onCopy={() => toast(`Copied ${title}`)}>
          <strong className="heading">{title}</strong>
        </CopyToClipboard>
        <span className="dots">: </span>
        <span className="description">{description}</span>
      </li>
    ))}
  </ConventionWrapper>
);

CommitConvention.defaultProps = {
  items: [],
  active: false
};

CommitConvention.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    })
  ),
  active: PropTypes.bool
};

export default CommitConvention;

export const query = graphql`
  fragment CommitConvention on ContentJson {
    convention {
      items {
        title
        description
      }
    }
  }
`;
