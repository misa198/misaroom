import styled from "styled-components";

export const RoomWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const RoomOverlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
