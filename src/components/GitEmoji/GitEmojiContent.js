import styled from "@emotion/styled";
import mq from "../../theme/mq";

export default styled.div`
  display: grid;
  grid-gap: 1rem;
  padding-bottom: 2rem;
  ${mq.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${mq.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
`;
