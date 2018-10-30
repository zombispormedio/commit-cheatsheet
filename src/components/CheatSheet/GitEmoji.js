import styled from "react-emotion";

export const GitEmoji = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(100px, auto);
  max-height: 100vh;
  overflow-y: auto;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 5rem;
`;
