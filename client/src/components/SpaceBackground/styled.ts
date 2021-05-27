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

export const Boi = styled.div`
  position: absolute;
  left: 0%;
  top: 50%;
  animation: eject 5s infinite linear;
  transform-origin: 13vmin 25vmin;
  transform: translate3d(-50vmin, -20vmin, 0px) rotate(0turn);

  @keyframes eject {
    0% {
      transform: translate3d(-50vmin, -20vmin, 0px) rotate(0turn);
    }
    50%,
    100% {
      transform: translate3d(100vw, -20vmin, 0px) rotate(-2turn);
    }
  }
`;

export const RightLeg = styled.div`
  position: absolute;
  left: 4vmin;
  top: 28vmin;
  width: 11vmin;
  height: 11vmin;
  background: radial-gradient(ellipse at 20% 70%, #0c9fc4 15%, #fff0 15%),
    radial-gradient(ellipse at 0% 29%, #fff0 40%, #0c9fc4 40%);
  background-repeat: no-repeat;
  border-radius: 20vmin;
  background-size: 150% 96%, 100% 100%;
  filter: url(#inset);
`;

export const LeftLef = styled.div`
  position: absolute;
  left: 1vmin;
  top: 25vmin;
  width: 11vmin;
  height: 11vmin;
  background: radial-gradient(ellipse at 20% 70%, #0c9fc4 15%, #fff0 15%),
    radial-gradient(ellipse at 0% 29%, #fff0 40%, #0c9fc4 40%);
  background-repeat: no-repeat;
  border-radius: 20vmin;
  background-size: 150% 96%, 100% 100%;
  &:not(:nth-child(2)) {
    clip-path: polygon(-10% 110%, 100% 110%, 110% 60%, 70% 20%, -5% 30%);
  }
  &:nth-child(2) {
    filter: url(#inset);
  }
`;

export const BackPack = styled.div`
  position: absolute;
  left: 1.2vmin;
  top: 14vmin;
  background: #14ebe1;
  width: 7vmin;
  height: 11vmin;
  border-radius: 3vmin;
  transform: rotate(7deg);
  border: 7px solid black;
`;

export const Belly = styled.div`
  position: absolute;
  width: 15vmin;
  height: 25vmin;
  background: #0c9fc4
    radial-gradient(ellipse at 42% 33%, #14ebe1 50%, #fff0 52%);
  border-radius: 10vmin;
  top: 7vmin;
  left: 6vmin;
  transform: rotate(10deg);
  background-size: 140% 114%;
  border: 7px solid black;
`;

export const Eye = styled.div`
  position: absolute;
  left: 13vmin;
  top: 9vmin;
  border: 6px solid black;
  width: 10vmin;
  height: 11vmin;
  border-radius: 26vmin;
  transform: rotate(18deg) scale(1, 0.5);
  border-top-width: 12px;
  border-bottom-width: 12px;
  background: radial-gradient(ellipse at 31% 20%, #f9fff7 15%, #fff0 20%),
    radial-gradient(ellipse at 50% 40%, #82c9e4 65%, #fff0 70%),
    radial-gradient(ellipse at 60% 30%, #40646f 100%, #fff0 100%);
  background-size: 140% 100%, 96% 80%, 100% 100%;
  background-repeat: no-repeat;
`;
