import { FC, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Play, Image } from "react-feather";

import {
  ChatInputWrapper,
  ChatInputImageButton,
  ChatInputForm,
  ChatInputTextField,
  ChatInputButton,
} from "./styled";

const schema = yup.object().shape({
  content: yup.string().required(),
});

const ChatInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hideImageButton, setHideImageButton] = useState(false);

  function switchImageButton(): void {
    setHideImageButton(!hideImageButton);
  }

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: schema,
    onSubmit: (formValues) => {
      console.log(formValues);
      if (inputRef.current) inputRef.current.value = "";
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
          ref={inputRef}
        />
        <ChatInputButton>
          <Play size={18} />
        </ChatInputButton>
      </ChatInputForm>
    </ChatInputWrapper>
  );
};

export default ChatInput;
