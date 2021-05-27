import { FC, useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { nanoid } from "nanoid";

import {
  Sky,
  Star,
  Boi,
  RightLeg,
  LeftLef,
  BackPack,
  Belly,
  Eye,
} from "./styled";

const SpaceBackground: FC = () => {
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();

  const [starAmount, setStarAmount] = useState<number>(0);

  useEffect(() => {
    let about = Math.round(width / 15);
    about = about < 100 ? about : 100;
    setStarAmount(about);
  }, [width]);

  return (
    <Sky ref={ref}>
      {Array.from(Array(starAmount).keys()).map(() => (
        <Star key={`star_${nanoid(10)}`} />
      ))}
      <Boi>
        <RightLeg />
        <BackPack />
        <Belly />
        <Eye />
        <LeftLef />
      </Boi>
    </Sky>
  );
};

export default SpaceBackground;
