import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "react-feather";

import {
  ChatImageViewerWrapper,
  ChatImageViewerContainer,
  ChatImageViewerImage,
  ChatImageViewerCloseButton,
} from "./styled";

import { RootState } from "../../../../store";

import { clearImageViewerImage } from "../../../../store/slice/room.slice";

const ChatImageViewer: FC = () => {
  const dispatch = useDispatch();
  const imageViewer = useSelector((state: RootState) => state.room.imageViewer);

  function closeImageViewer(): void {
    dispatch(clearImageViewerImage());
  }

  return (
    <ChatImageViewerWrapper display={imageViewer !== ""}>
      <ChatImageViewerContainer>
        <ChatImageViewerCloseButton onClick={closeImageViewer}>
          <X />
        </ChatImageViewerCloseButton>
        <ChatImageViewerImage src={imageViewer} display={imageViewer !== ""} />
      </ChatImageViewerContainer>
    </ChatImageViewerWrapper>
  );
};

export default memo(ChatImageViewer);
