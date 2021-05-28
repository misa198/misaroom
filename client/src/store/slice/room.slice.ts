import { createSlice } from "@reduxjs/toolkit";

interface State {
  status: {
    showChat: boolean;
  };
}

const initialState: State = {
  status: {
    showChat: false,
  },
};

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeChatStatus(state) {
      return {
        ...state,
        status: {
          showChat: !state.status.showChat,
        },
      };
    },
  },
});

export const { changeChatStatus } = slice.actions;
export default slice.reducer;
