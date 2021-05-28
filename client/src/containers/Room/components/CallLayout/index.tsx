import { useState, FC, useEffect } from "react";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";
import ControlBar from "../ControlBar";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";

import { User } from "../../../../types/User";

interface PropTypes {
  users: User[];
}

const amount = 6;

const CallLayout: FC<PropTypes> = ({ users }: PropTypes) => {
  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });
  const [showControlBar, setShowControlBar] = useState<boolean>(false);

  useEffect(() => {
    setLayout(calLayout(amount));
  }, []);

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
      {Array.from(Array(amount).keys()).map((_, index) => (
        <CallLayoutItem key={index.toFixed()} />
      ))}
      <ControlBar showControlBar={showControlBar} />
    </CallLayoutWrapper>
  );
};

export default CallLayout;
