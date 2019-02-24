import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CopyToClipboard } from "react-copy-to-clipboard";
import mq from "../../theme/mq";
import "./gitemoji.css";

const Emoji = styled.div`
  border-radius: 4px;
  span {
    font-size: 2em;
    ${mq.mobile} {
      font-size: 5em;
    }
  }
`;

const EmojiDescription = styled.div`
  padding: 0.5rem;
`;

const GitEmojiItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
`;

const GitEmojiItem = ({ emoji, code, description, name }) => (
  <CopyToClipboard text={code} onCopy={() => console.log(`Copied ${code}`)}>
    <GitEmojiItemWrapper>
      <Emoji className={name}>
        <span>{emoji}</span>
      </Emoji>
      <EmojiDescription>
        <div>{code}</div>
        <div>{description}</div>
      </EmojiDescription>
    </GitEmojiItemWrapper>
  </CopyToClipboard>
);

GitEmojiItem.propTypes = {
  emoji: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default GitEmojiItem;
