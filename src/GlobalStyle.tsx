import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  whiteColor?: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    margin: 0;
    color: white;
    background: ${(props) => (props.whiteColor ? "white" : "black")};
    font-family: sans-serif;
    max-width:800px;
    max-height:800px;
  }
`;

export default GlobalStyle;
