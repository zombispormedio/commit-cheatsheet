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
  strong {
    cursor: pointer;
  }

  ${mq.mobile} {
    display: ${ props => props.active ? 'block' : 'none' };
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


export * from "./GitEmoji";
export * from "./GitEmojiItem";
export * from "./MobileTabs";