import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import mq from "../../theme/mq";
import GitEmojiItem from "./GitEmojiItem";

const GitEmojiWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 5rem;
  ${mq.desktop} {
    grid-template-columns: repeat(3, 1fr);
    max-height: 100vh;
    width: 75%;
    height: 100vh;
    overflow-y: scroll;
    padding-right: 1rem;
  }
  ${mq.mobile} {
    display: ${props => (props.active ? "grid" : "none")};
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

export const GitEmojiInput = styled.input`
  position: fixed;
  bottom: 0.5rem;
  width: 50%;
  ${mq.mobile} {
    position: inherit;
    width: 100%;
    bottom: inherit;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
`;

const GitEmoji = ({ active, items }) => {
  const [search, setSearch] = useState("");
  const onChange = useCallback(({ target: { value } }) => setSearch(value));
  const content = useMemo(
    () =>
      (search === ""
        ? items
        : items.filter(item => {
            const regex = new RegExp(search, "gim");
            return regex.test(item.code) || regex.test(item.description);
          })
      ).map(item => <GitEmojiItem key={item.code} {...item} />),
    [search, items]
  );

  return (
    <GitEmojiWrapper active={active}>
      <GitEmojiInput
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Search emoji"
        aria-label="Search emoji"
      />
      {content}
    </GitEmojiWrapper>
  );
};

GitEmoji.defaultProps = {
  items: [],
  active: false
};

GitEmoji.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      emoji: PropTypes.string,
      code: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string
    })
  ),
  active: PropTypes.bool
};

export default GitEmoji;

export const query = graphql`
  fragment GitEmoji on ContentJson {
    gitemoji {
      items {
        name
        emoji
        code
        description
      }
    }
  }
`;
