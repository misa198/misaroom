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
    addNewUser(state, action: PayloadAction<User>) {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    removeUser(state, action: PayloadAction<string>) {
      const users: User[] = JSON.parse(JSON.stringify(state.users));
      const index = users.findIndex((user) => user.id === action.payload);
      users.splice(index, 1);
      return {
        ...state,
        users,
      };
    },
  },
});

export const { changeChatStatus, setUsers, addNewUser, removeUser } =
  slice.actions;
export default slice.reducer;
