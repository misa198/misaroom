import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #090c10;
    color: #ffffff;
    font-family: "Source Sans Pro", serif;
    font-size: 16px;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  @keyframes formAppear {
    0% {
      opacity: 0;
    } 
    100% {
      opacity: 1;
    }
  }
`;
