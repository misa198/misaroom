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
    font-family: "Source Sans Pro", serif;
    font-size: 16px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
