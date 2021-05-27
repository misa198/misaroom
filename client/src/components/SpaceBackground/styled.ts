import styled from "styled-components";

export const Sky = styled.div`
  display: block;
  background: black;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

function createChildCss(): string {
  let styles = "";

  for (let i = 1; i <= 100; i += 1) {
    styles += `
      &:nth-child(${i}) {
        width: ${Math.floor(Math.random() * 7) + 3}px;
        height: ${Math.floor(Math.random() * 7) + 3}px;
        animation-duration: ${Math.floor(Math.random() * 30) + 15}s;
        animation-delay: ${Math.floor(Math.random() * 40) - 40}s;
        top: ${Math.floor(Math.random() * 101) - 1}vh;
      }
    `;
  }

  return styles;
}

export const Star = styled.div`
  border-radius: 50%;
  background: white;
  position: absolute;
  animation: star linear infinite;
  ${createChildCss()}

  @keyframes star {
    from {
      transform: translate3d(-100%, 0, 1px);
    }
    to {
      transform: translate3d(100vw, 0, 1px);
    }
  }
`;
