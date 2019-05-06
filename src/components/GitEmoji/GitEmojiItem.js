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

const EmojiDetails = styled.div`
  padding: 0.5rem;
  .description {
    min-height: 3rem;
  }
`;

const EmojiWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  border-radius: 4px;
`;

const EmojiContent = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
`;

const PinIcon = styled.i`
  align-self: flex-end;
  margin: 0.5rem;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const GitEmojiItem = ({
  emoji,
  code,
  description,
  name,
  onCopy,
  onPin,
  pinned
}) => (
  <EmojiWrapper>
    <CopyToClipboard text={code} onCopy={() => onCopy(code)}>
      <EmojiContent>
        <Emoji className={name}>
          <span>{emoji}</span>
        </Emoji>
        <EmojiDetails>
          <div className="code">{code}</div>
          <div className="description">{description}</div>
        </EmojiDetails>
      </EmojiContent>
    </CopyToClipboard>
    <PinIcon
      className={`icon-pin${pinned ? "-off" : ""}`}
      onClick={() => onPin(code)}
    />
  </EmojiWrapper>
);

GitEmojiItem.defaultProps = {
  onCopy: code => console.log(`Copied ${code}`),
  onPin: code => console.log(`Pinned ${code}`),
  pinned: false
};

GitEmojiItem.propTypes = {
  emoji: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  onPin: PropTypes.func,
  pinned: PropTypes.bool
};

export default GitEmojiItem;
