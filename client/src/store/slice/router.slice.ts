import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  from: string;
  to: string;
}

const initialState: State = {
  from: "",
  to: "",
};

const slice = createSlice({
  name: "router",
  initialState,
  reducers: {
    update(_state, action: PayloadAction<State>) {
      return {
        from: action.payload.from,
        to: action.payload.to,
      };
    },
  },
});

export const { update } = slice.actions;
export default slice.reducer;
