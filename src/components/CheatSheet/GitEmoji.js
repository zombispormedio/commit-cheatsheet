import styled from "react-emotion";
import mq from "../../theme/mq";

export const GitEmoji = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  max-height: 100vh;
  overflow-y: auto;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 5rem;
  ${mq.mobile} {
    max-height: inherit;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: inherit;
    padding-top: 2rem;
    padding-bottom: 3rem;
    padding-right: inherit;
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
