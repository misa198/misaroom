import { FC, memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import { HomeWrapper, HomeOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import CreateRoomForm from "./components/CreateRoomForm";

import { clearState } from "../../store/slice/room.slice";

const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  return (
    <HomeWrapper>
      <SpaceBackground />
      <HomeOverlay>
        <CreateRoomForm />
      </HomeOverlay>
    </HomeWrapper>
  );
};

export default memo(Home);
