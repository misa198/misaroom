import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { Play, Image } from "react-feather";

import {
  ChatInputWrapper,
  ChatInputImageButton,
  ChatInputForm,
  ChatInputTextField,
  ChatInputButton,
} from "./styled";

import { insertMessage } from "../../../../store/slice/room.slice";

import { socket } from "../../../../shared/socket/SocketProvider";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";

const schema = yup.object().shape({
  content: yup.string().required(),
});

const initialValues = {
  content: "",
};

const ChatInput: FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.room.users);
  const roomId = useSelector((state: RootState) => state.room.id);
  const [hideImageButton, setHideImageButton] = useState(false);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const sender = users.find((u) => u.id === socket.id);
    setUser(sender);
  }, [users]);

  function switchImageButton(): void {
    setHideImageButton(!hideImageButton);
  }

  function sendMessage(content: string): void {
    if (user) {
      const id = nanoid(64);
      const message = {
        roomId,
        id,
        content,
      };
      socket.emit("send-message", message);
      dispatch(
        insertMessage({
          ...message,
          sender: user.name,
          senderId: user.id,
          avatar: user.avatar,
          type: "text",
          time: new Date().toString(),
        })
      );
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues, { resetForm }) => {
      sendMessage(formValues.content);

      resetForm();
    },
  });

  return (
    <ChatInputWrapper>
      <ChatInputImageButton hide={hideImageButton}>
        <Image size={18} />
      </ChatInputImageButton>
      <ChatInputForm onSubmit={formik.handleSubmit}>
        <ChatInputTextField
          onFocus={switchImageButton}
          onBlur={switchImageButton}
          type="text"
          placeholder="text a message..."
          onChange={formik.handleChange}
          value={formik.values.content}
          id="content"
          name="content"
          autoComplete="off"
        />
        <ChatInputButton type="submit">
          <Play size={18} />
        </ChatInputButton>
      </ChatInputForm>
    </ChatInputWrapper>
  );
};

export default ChatInput;
