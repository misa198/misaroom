import { useState, FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import ControlBar from "../ControlBar";

import { RootState } from "../../../../store";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";

const CallLayout: FC = () => {
  const users = useSelector((state: RootState) => state.room.users);
  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);

  useEffect(() => {
    setLayout(calLayout(users.length));
  }, [users.length]);

  useEffect((): any => {
    if (showControlBar) {
      const id = setTimeout(() => {
        setShowControlBar(false);
      }, 5000);

      return () => clearTimeout(id);
    }
    return null;
  }, [showControlBar]);

  function changeControlBar(): void {
    setShowControlBar(true);
  }

  return (
    <CallLayoutWrapper layout={layout} onMouseMove={changeControlBar}>
      {users.map((user, index) => (
        <CallLayoutItem user={user} key={`user_${index.toFixed()}`} />
      ))}
      <ControlBar showControlBar={showControlBar} />
    </CallLayoutWrapper>
  );
};

export default CallLayout;
