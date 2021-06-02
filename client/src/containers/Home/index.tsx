import { FC, memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HomeWrapper, HomeOverlay } from "./styled";

import SpaceBackground from "../../components/SpaceBackground";
import CreateRoomForm from "./components/CreateRoomForm";

import { clearState } from "../../store/slice/room.slice";
import { RootState } from "../../store";

const Home: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const from = useSelector((state: RootState) => state.router.from);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    const { state } = location;
    if (from.split("/")[1] === "r" && !(state as any)?.valid) {
      window.location.href = "/";
    }
  }, [from, location]);

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
