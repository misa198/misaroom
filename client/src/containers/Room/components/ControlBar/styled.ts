import styled from "styled-components";

export const ControlBarWrapper = styled.div<{ showControlBar: boolean }>`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 8%;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  visibility: ${(props) => (props.showControlBar ? "unset" : "hidden")};
  opacity: ${(props) => (props.showControlBar ? 1 : 0)};
  transition: all 300ms;
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
  transition: all 300ms;
  background-color: ${(props) =>
    props.active ? "#fff" : "rgba(0, 0, 0, 0.5)"};
  color: ${(props) => (props.active ? "#000" : "#fff")};
  ${(props) => (props.call ? "background: red;" : "")}

  ${(props) =>
    props.call
      ? ""
      : `&:hover {
    background-color: #fff;
    color: #000;
  }`}
`;
