import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

const NotFound: FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/");
  }, [history]);

  return <></>;
};

export default NotFound;
