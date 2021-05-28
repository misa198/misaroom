import { combineReducers, configureStore } from "@reduxjs/toolkit";

import roomReducer from "./slice/room.slice";

const rootReducer = combineReducers({
  room: roomReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
