import { combineReducers, configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slice/room.slice";
import routerReducer from "./slice/router.slice";

const rootReducer = combineReducers({
  room: roomReducer,
  router: routerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
