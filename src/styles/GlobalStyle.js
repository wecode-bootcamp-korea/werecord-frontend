import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import dayjs from 'dayjs';

const times = dayjs().hour();

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
  }

  body {
    min-height: 100%;
    margin: 0 auto;
    overflow-x: hidden;
    background: ${
      times >= 22 && 'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)'
    };
    background: ${
      times < 22 && 'linear-gradient(180deg, #FFC49D 0%, #9A8ADB 100%)'
    };
    background: ${
      times < 18 && `linear-gradient(180deg, #E7F5FF 0%, #FFC49D 100%)`
    };
    background: ${
      times < 12 && 'linear-gradient(180deg, #FD92AE 0%, #E7F5FF 100%)'
    };
    background: ${
      times < 9 && 'linear-gradient(180deg, #7C9BEA 0%, #FD92AE 100%)'
    };
    background: ${
      times < 4 && 'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)'
    };
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
