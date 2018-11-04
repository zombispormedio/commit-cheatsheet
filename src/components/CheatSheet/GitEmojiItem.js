import styled from "react-emotion";
import mq from "../../theme/mq";
import "./gitemoji.css";

export const GitEmojiItem = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(168, 182, 191, 0.6);
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
`;

export const Emoji = styled.div`
  border-radius: 4px;
  span {
    font-size: 2em;
    ${mq.mobile} {
      font-size: 5em;
    }
  }
`;

export const EmojiDescription = styled.div`
  padding: 0.5rem;
`;
