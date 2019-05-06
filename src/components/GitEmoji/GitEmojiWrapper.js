import styled from "@emotion/styled";
import mq from "../../theme/mq";

export default styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 5rem;
  ${mq.desktop} {
    max-height: 100vh;
    width: 75%;
    height: 100vh;
    overflow-y: scroll;
    padding-right: 1rem;
  }
  ${mq.mobile} {
    display: ${props => (props.active ? "flex" : "none")};
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;
