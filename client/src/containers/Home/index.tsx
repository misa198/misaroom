import { FC } from "react";

import { HomeWrapper, HomeOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import CreateRoomForm from "./CreateRoomForm";

const Home: FC = () => {
  return (
    <HomeWrapper>
      <SpaceBackground />
      <HomeOverlay>
        <CreateRoomForm />
      </HomeOverlay>
    </HomeWrapper>
  );
};

export default Home;
