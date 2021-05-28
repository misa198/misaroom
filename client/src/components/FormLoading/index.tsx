import { FC } from "react";
import Loader from "react-loader-spinner";

import { FormLoaderOutside, FormLoaderWrapper, FormLoaderText } from "./styled";

const FormLoader: FC = () => {
  return (
    <FormLoaderOutside>
      <FormLoaderWrapper>
        <Loader type="Puff" color="#fff" height={30} width={30} />
        <FormLoaderText>Loading...</FormLoaderText>
      </FormLoaderWrapper>
    </FormLoaderOutside>
  );
};

export default FormLoader;
