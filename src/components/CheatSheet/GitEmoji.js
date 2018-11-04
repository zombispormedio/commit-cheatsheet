import styled from "react-emotion";
import mq from "../../theme/mq";

export const GitEmoji = styled.div`
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
    display: ${props => props.active ? 'grid' : 'none'};
    grid-template-columns: repeat( auto-fit, minmax(15rem, 1fr) );
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
