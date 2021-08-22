import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import dayjs from 'dayjs';

const HOUR = dayjs().hour();
const changeBgColor = h => {
  if (h >= 22 || h < 4)
    return 'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)';
  if (h >= 18 && h < 22)
    return 'linear-gradient(180deg, #FFC49D 0%, #9A8ADB 100%)';
  if (h >= 12 && h < 18)
    return `linear-gradient(180deg, #E7F5FF 0%, #FFC49D 100%)`;
  if (h >= 9 && h < 12)
    return 'linear-gradient(180deg, #7C9BEA 0%, #FD92AE 100%)';
};

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
    ${changeBgColor(HOUR)};
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
