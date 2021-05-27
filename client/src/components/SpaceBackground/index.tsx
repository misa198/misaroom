import { FC } from "react";

import { Sky, Star } from "./styled";

const SpaceBackground: FC = () => {
  return (
    <Sky>
      {Array.from(Array(100).keys()).map((_, index) => (
        <Star key={index.toFixed()} />
      ))}
    </Sky>
  );
};

export default SpaceBackground;
