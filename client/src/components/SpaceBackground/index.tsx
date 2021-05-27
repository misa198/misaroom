import { FC, useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";

import { Sky, Star } from "./styled";

const SpaceBackground: FC = () => {
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();

  const [starAmount, setStarAmount] = useState<number>(0);

  useEffect(() => {
    let about = Math.round(width / 19);
    about = about < 100 ? about : 100;
    setStarAmount(about);
  }, [width]);

  return (
    <Sky ref={ref}>
      {Array.from(Array(starAmount).keys()).map((_, index) => (
        <Star key={`star_${index * 1}`} />
      ))}
    </Sky>
  );
};

export default SpaceBackground;
