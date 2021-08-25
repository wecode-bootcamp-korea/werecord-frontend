import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import dayjs from 'dayjs';
import changeBgColor from '../pages/Util/changeBgColor';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root{
    font-size: 16px;
  }

  html {
    min-height: 100%;
    font-family: 'Noto Sans', 'sans-serif';
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans', 'sans-serif';
    font: inherit;

    &::selection {
      background: ${({ theme }) => theme.colors.purple};
    }
  }

  body {
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    background: url(/images/bgImage/wave1.png), url(/images/bgImage/wave2.pgn),
    ${changeBgColor(dayjs().hour())};
    background-size: cover;
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
