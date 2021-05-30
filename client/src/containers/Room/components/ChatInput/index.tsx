import { FC, useState } from "react";
import { Play, Image } from "react-feather";

import {
  ChatInputWrapper,
  ChatInputImageButton,
  ChatInputForm,
  ChatInputTextField,
  ChatInputButton,
} from "./styled";

const ChatInput: FC = () => {
  const [hideImageButton, setHideImageButton] = useState(false);

  function switchImageButton(): void {
    setHideImageButton(!hideImageButton);
  }

  return (
    <ChatInputWrapper>
      <ChatInputImageButton hide={hideImageButton}>
        <Image size={18} />
      </ChatInputImageButton>
      <ChatInputForm>
        <ChatInputTextField
          placeholder="text a message..."
          onFocus={switchImageButton}
          onBlur={switchImageButton}
        />
        <ChatInputButton>
          <Play size={18} />
        </ChatInputButton>
      </ChatInputForm>
    </ChatInputWrapper>
  );
};

export default ChatInput;
