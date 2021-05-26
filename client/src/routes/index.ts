import { lazy } from "react";

export const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../containers/Home")),
  },
];
