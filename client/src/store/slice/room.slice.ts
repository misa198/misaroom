import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { Message } from "../../types/Message";

interface State {
  calling: boolean;
  id: string;
  status: {
    showChat: boolean;
    camera: boolean;
    audio: boolean;
  };
  users: User[];
  imageViewer: string;
  messages: Message[];
  notification: number;
}

const initialState: State = {
  calling: false,
  id: "",
  status: {
    showChat: false,
    audio: false,
    camera: false,
  },
  users: [],
  imageViewer: "",
  messages: [],
  notification: 0,
};

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearState() {
      return initialState;
    },
    changeCallingStatus(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        calling: action.payload,
      };
    },
    changeChatStatus(state) {
      return {
        ...state,
        notification: 0,
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
    increaseNotification(state: State) {
      if (!state.status.showChat)
        return {
          ...state,
          notification: state.notification + 1,
        };
      return state;
    },
    insertMessage(state: State, action: PayloadAction<Message>) {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    deleteMessage(state: State, action: PayloadAction<string>) {
      const messageIndex = state.messages.findIndex(
        (m) => m.id === action.payload
      );
      const messages = JSON.parse(JSON.stringify(state.messages));
      messages[messageIndex].content = "This message was removed";
      messages[messageIndex].type = "removed";
      return {
        ...state,
        messages: [...messages],
      };
    },
    changeMessageStatus(
      state: State,
      action: PayloadAction<{
        id: string;
        status: "error" | "ok";
      }>
    ) {
      const messageIndex = state.messages.findIndex(
        (m) => m.id === action.payload.id
      );
      const messages = JSON.parse(JSON.stringify(state.messages));
      messages[messageIndex].status = action.payload.status;
      return {
        ...state,
        messages: [...messages],
      };
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
  changeCallingStatus,
  changeChatStatus,
  setUsers,
  addNewUser,
  removeUser,
  switchCam,
  switchMic,
  userSwitchDevice,
  increaseNotification,
  insertMessage,
  deleteMessage,
  changeMessageStatus,
  setImageViewerImage,
  clearImageViewerImage,
} = slice.actions;
export default slice.reducer;
