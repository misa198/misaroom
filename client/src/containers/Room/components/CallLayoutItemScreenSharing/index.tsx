import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "react-tooltip";
import { Monitor } from "react-feather";

import {
  CallLayoutItemWrapper,
  CallLayoutItemNameWrapper,
  CallLayoutItemName,
  CallLayoutItemNameMic,
  CallLayoutItemVideoWrapper,
  CallLayoutItemVideo,
} from "../CallLayoutItem/styled";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";

interface PropTypes {
  userId: string;
}

const CallLayoutItemScreenSharing: FC<PropTypes> = ({ userId }: PropTypes) => {
  const users = useSelector((state: RootState) => state.room.users);
  const status = useSelector((state: RootState) => state.room.status);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const foundUser = users.find((u) => u.id === userId);
    setUser(foundUser);
  }, [userId, users]);

  return (
    <CallLayoutItemWrapper>
      <CallLayoutItemVideoWrapper video={status.camera}>
        <CallLayoutItemVideo controls={false} ref={videoRef} muted autoPlay />
      </CallLayoutItemVideoWrapper>

      {user && (
        <>
          <CallLayoutItemNameWrapper data-tip={user.name}>
            <CallLayoutItemName>{user.name}</CallLayoutItemName>
            <CallLayoutItemNameMic>
              <Monitor size={14} />
            </CallLayoutItemNameMic>
          </CallLayoutItemNameWrapper>
          <Tooltip place="top" type="dark" effect="solid" />
        </>
      )}
    </CallLayoutItemWrapper>
  );
};

export default CallLayoutItemScreenSharing;
