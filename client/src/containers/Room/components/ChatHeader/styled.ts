import styled from "styled-components";

export const ChatHeaderWrapper = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatHeaderTitle = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
`;

export const ChatHeaderCloseButton = styled.div`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
