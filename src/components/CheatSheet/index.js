import styled from "@emotion/styled";
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
