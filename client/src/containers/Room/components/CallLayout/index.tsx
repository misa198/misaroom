import { useState, FC, useEffect } from "react";

import { CallLayoutWrapper } from "./styled";

import CallLayoutItem from "../CallLayoutItem";

import { calLayout, Layout } from "../../../../shared/cal-layout/cal-layout";

import { User } from "../../../../types/User";

interface PropTypes {
  users: User[];
}

const amount = 50;

const CallLayout: FC<PropTypes> = ({ users }: PropTypes) => {
  const [layout, setLayout] = useState<Layout>({ columns: 0, rows: 0 });

  useEffect(() => {
    setLayout(calLayout(amount));
  }, []);

  return (
    <CallLayoutWrapper layout={layout}>
      {Array.from(Array(amount).keys()).map((_, index) => (
        <CallLayoutItem key={index.toFixed()} />
      ))}
    </CallLayoutWrapper>
  );
};

export default CallLayout;
