import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface State {
  id: string;
  status: {
    showChat: boolean;
    camera: boolean;
    audio: boolean;
  };
  users: User[];
}

const initialState: State = {
  id: "",
  status: {
    showChat: false,
    audio: true,
    camera: false,
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
          ...state.status,
          showChat: !state.status.showChat,
        },
      };
    },
    setUsers(state, action: PayloadAction<{ users: User[]; id: string }>) {
      return {
        ...state,
        id: action.payload.id,
        users: action.payload.users,
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
    turnOnMic(state) {
      return {
        ...state,
        status: {
          ...state.status,
          audio: true,
        },
      };
    },
    turnOffMic(state) {
      return {
        ...state,
        status: {
          ...state.status,
          audio: false,
        },
      };
    },
    turnOffCam(state) {
      return {
        ...state,
        status: {
          ...state.status,
          camera: false,
        },
      };
    },
    turnOnCam(state) {
      return {
        ...state,
        status: {
          ...state.status,
          camera: true,
        },
      };
    },
  },
});

export const {
  changeChatStatus,
  setUsers,
  addNewUser,
  removeUser,
  turnOnCam,
  turnOffCam,
  turnOnMic,
  turnOffMic,
} = slice.actions;
export default slice.reducer;
