import styled from "styled-components";

export const CallLayoutItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  background-color: #0d1117;
  position: relative;
  user-select: none;
`;

export const CallLayoutItemDetails = styled.div<{ video?: number | boolean }>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: ${(props) => (props.video ? "none" : "flex")};
`;

export const CallLayoutItemAvatarVoiceDetect = styled.div`
  padding: 5px;
  /* background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
  border-radius: 50%;
`;

export const CallLayoutItemAvatarImg = styled.div<{ src: string }>`
  width: 90%;
  height: 90%;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;

export const CallLayoutItemAvatar = styled.div<{
  height: number;
  width: number;
}>`
  ${(props) =>
    props.height >= props.width
      ? `
    width: ${props.width * 0.3}px;
    height: ${props.width * 0.3}px;
    `
      : `
    width: ${props.height * 0.3}px;
    height: ${props.height * 0.3}px;
    `}

  max-width: 130px;
  max-height: 130px;
  border-radius: 50%;
  overflow: hidden;
  background-image: linear-gradient(
    -225deg,
    #3d4e81 0%,
    #5753c9 48%,
    #6e7ff3 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CallLayoutItemNameWrapper = styled.div`
  position: absolute;
  max-width: 35%;
  bottom: 5px;
  left: 5px;
  font-weight: 300;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 5px;
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const CallLayoutItemName = styled.div`
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CallLayoutItemNameMic = styled.div`
  margin-left: 8px;
`;

export const CallLayoutItemVideoWrapper = styled.div<{
  video?: number | boolean;
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
  visibility: ${(props) => (!props.video ? "hidden" : "unset")};
`;

export const CallLayoutItemVideo = styled.video`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
  pointer-events: none;
`;

export const CallLayoutItemVideoForAudioTrack = styled.video`
  width: 0;
  height: 0;
  position: absolute;
  visibility: hidden;
  pointer-events: none;
`;
