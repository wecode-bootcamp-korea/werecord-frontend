import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root{
    font-size: 16px;
  }

  html {
    font-family: 'Noto Sans', 'sans-serif';
  }

  html, body { height: 100%; }
body {
  background:radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%);
  overflow: hidden;
}
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans', 'sans-serif';
    font: inherit;
  }

  body {
    margin: 0 auto;
    background: linear-gradient(180deg, #FD92AE 0%, #E7F5FF 100%);
  }

  button,
  input {
    background-color: transparent;
    outline: none;
    border: none;
    font-size: inherit;
  }

  ul,li,ol {
    list-style: none;
    
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
