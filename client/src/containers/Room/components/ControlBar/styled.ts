import styled from "styled-components";

export const ControlBarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 8%;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const ControlBarContainer = styled.div`
  height: 100%;
  display: flex;
`;

export const ControlBarButton = styled.button<{
  active: boolean;
  call?: boolean;
}>`
  margin: 0 0.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.active ? "#fff" : "rgba(0, 0, 0, 0.5)")};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  ${(props) => (props.call ? "background: red;" : "")}
`;
