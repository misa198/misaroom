import { FC, KeyboardEvent, memo, useEffect, useState } from "react";
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
  const [display, setDisplay] = useState<boolean>(false);
  const dispatch = useDispatch();
  const imageViewer = useSelector((state: RootState) => state.room.imageViewer);

  useEffect(() => {
    if (imageViewer) setDisplay(true);
    else setDisplay(false);
  }, [imageViewer]);

  function closeImageViewer(): void {
    dispatch(clearImageViewerImage());
  }

  return (
    <ChatImageViewerWrapper display={display ? 1 : 0}>
      <ChatImageViewerContainer>
        <ChatImageViewerCloseButton onClick={closeImageViewer}>
          <X />
        </ChatImageViewerCloseButton>
        <ChatImageViewerImage src={imageViewer} display={display ? 1 : 0} />
      </ChatImageViewerContainer>
    </ChatImageViewerWrapper>
  );
};

export default memo(ChatImageViewer);
