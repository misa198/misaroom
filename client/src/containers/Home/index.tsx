import { FC } from "react";

import { HomeWrapper, HomeOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";

const Home: FC = () => {
  return (
    <HomeWrapper>
      <SpaceBackground />
      <HomeOverlay>A</HomeOverlay>
    </HomeWrapper>
  );
};

export default Home;
