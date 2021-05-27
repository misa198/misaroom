import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: rgb(34, 31, 36);
    color: #ffffff;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
