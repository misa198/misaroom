import { FC, useEffect, useState, ChangeEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { nanoid } from "nanoid";
import { Play, Image, X } from "react-feather";
import { toast } from "react-toastify";
import axios from "axios";

import {
  ChatInputWrapper,
  ChatInputImageButton,
  ChatInputForm,
  ChatInputTextField,
  ChatInputButton,
  ChatInputMessageFile,
  ChatInputPreviewImageWrapper,
  ChatInputPreviewImageContainer,
  ChatInputPreviewImage,
  ChatInputPreviewMessageOverlay,
  ChatInputPreviewMessageButton,
} from "./styled";

import {
  changeMessageStatus,
  insertMessage,
} from "../../../../store/slice/room.slice";

import { socket } from "../../../../shared/socket/SocketProvider";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";
import { apiUrl } from "../../../../constants/url";

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
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [hideImageButton, setHideImageButton] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  useEffect(() => {
    const sender = users.find((u) => u.id === socket.id);
    setUser(sender);
  }, [users]);

  function onFileChange(e: ChangeEvent): void {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      if (target.files[0]) {
        if (target.files[0].size <= 3.5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          setImage(target.files[0]);
        } else {
          toast("Too large, maximum size is 3.5 Mb", {
            type: "error",
          });
        }
      }
    }
  }

  function cancelImage(): void {
    setImage(undefined);
    setTimeout(() => {
      setImagePreview("");
    }, 200);
  }

  function sendImageMessage(): void {
    if (image && user && imagePreview) {
      const formData = new FormData();
      const ext = image.name.split(".")[image.name.split(".").length - 1];
      const id = nanoid(64);
      const fileName = `${roomId}.${user?.id}.${id}.${ext}`;
      formData.append("image", image, fileName);
      dispatch(
        insertMessage({
          id,
          sender: user.name,
          senderId: user.id,
          avatar: user.avatar,
          type: "image",
          status: "pending",
          time: new Date().toString(),
          content: imagePreview,
        })
      );
      cancelImage();
      axios.post(`${apiUrl}api/files/images`, formData).catch(() => {
        toast("Fail to send image!", { type: "error" });
        dispatch(changeMessageStatus({ id, status: "error" }));
        cancelImage();
      });
    }
  }

  function onSelectImage(): void {
    if (inputFileRef.current) inputFileRef.current.click();
  }

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
      <ChatInputMessageFile onChange={onFileChange} ref={inputFileRef} />
      <ChatInputImageButton hide={hideImageButton} onClick={onSelectImage}>
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
      <ChatInputPreviewImageWrapper isShow={image !== undefined}>
        <ChatInputPreviewImageContainer>
          <ChatInputPreviewMessageOverlay>
            <ChatInputPreviewMessageButton onClick={cancelImage}>
              <X size={18} />
            </ChatInputPreviewMessageButton>
            <ChatInputPreviewMessageButton onClick={sendImageMessage}>
              <Play size={18} />
            </ChatInputPreviewMessageButton>
          </ChatInputPreviewMessageOverlay>
          <ChatInputPreviewImage src={imagePreview} />
        </ChatInputPreviewImageContainer>
      </ChatInputPreviewImageWrapper>
    </ChatInputWrapper>
  );
};

export default ChatInput;
