import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { Message } from "../../types/Message";

interface State {
  id: string;
  status: {
    showChat: boolean;
    camera: boolean;
    audio: boolean;
  };
  users: User[];
  imageViewer: string;
  message: Message[];
}

const initialState: State = {
  id: "",
  status: {
    showChat: false,
    audio: false,
    camera: false,
  },
  users: [],
  imageViewer: "",
  message: [],
};

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearState() {
      return initialState;
    },
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
    switchMic(state) {
      return {
        ...state,
        status: {
          ...state.status,
          audio: !state.status.audio,
        },
      };
    },
    switchCam(state) {
      return {
        ...state,
        status: {
          ...state.status,
          camera: !state.status.camera,
        },
      };
    },
    userSwitchDevice(
      state,
      action: PayloadAction<{
        enabled: boolean;
        type: "mic" | "camera";
        userId: string;
      }>
    ) {
      const index = state.users.findIndex(
        (u) => u.id === action.payload.userId
      );
      state.users[index][action.payload.type] = action.payload.enabled;
      return state;
    },
    setImageViewerImage(state: State, action: PayloadAction<string>) {
      return {
        ...state,
        imageViewer: action.payload,
      };
    },
    clearImageViewerImage(state) {
      return {
        ...state,
        imageViewer: "",
      };
    },
  },
});

export const {
  clearState,
  changeChatStatus,
  setUsers,
  addNewUser,
  removeUser,
  switchCam,
  switchMic,
  userSwitchDevice,
  setImageViewerImage,
  clearImageViewerImage,
} = slice.actions;
export default slice.reducer;
