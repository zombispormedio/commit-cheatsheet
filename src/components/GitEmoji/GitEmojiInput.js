import styled from "@emotion/styled";
import mq from "../../theme/mq";

export default styled.input`
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
