import styled from "react-emotion";
import mq from "../../theme/mq";

export const Cheatsheet = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  ${mq.mobile} {
    flex-direction: column;
    align-items: unset;
  }
`;

export const ScopeList = styled.ul`
  & strong {
    cursor: pointer;
  }
  ${mq.mobile} {
    display: ${ props => props.active ? 'block' : 'none' };
    padding-bottom: 2rem;
    padding-top: 2rem;
  }
`;


export * from "./GitEmoji";
export * from "./GitEmojiItem";
export * from "./MobileTabs";