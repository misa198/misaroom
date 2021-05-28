import styled from "styled-components";

import { Layout } from "../../../../shared/cal-layout/cal-layout";

export const CallLayoutWrapper = styled.div<{ layout: Layout }>`
  flex: 1;
  height: 100%;
  display: grid;
  grid-gap: 0.25rem;
  position: relative;
  ${(props) => `
    grid-template-columns: repeat(${props.layout.columns}, 1fr);
    grid-template-rows: repeat(${props.layout.rows}, 1fr);
  `}
`;
