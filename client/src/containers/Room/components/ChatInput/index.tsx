import { FC, useState } from "react";
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

const initialValues = {
  content: "",
};

const ChatInput: FC = () => {
  const [hideImageButton, setHideImageButton] = useState(false);

  function switchImageButton(): void {
    setHideImageButton(!hideImageButton);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (formValues, { resetForm }) => {
      console.log(formValues);
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
        />
        <ChatInputButton type="submit">
          <Play size={18} />
        </ChatInputButton>
      </ChatInputForm>
    </ChatInputWrapper>
  );
};

export default ChatInput;
