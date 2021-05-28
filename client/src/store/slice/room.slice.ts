import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface State {
  status: {
    showChat: boolean;
  };
  users: User[];
}

const initialState: State = {
  status: {
    showChat: false,
  },
  users: [],
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
    setUsers(state, action: PayloadAction<User[]>) {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { changeChatStatus, setUsers } = slice.actions;
export default slice.reducer;
