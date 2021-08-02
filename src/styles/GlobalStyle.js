import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root{
    font-size: 16px;
  }
  
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  max-width: 1440px;
  margin: 0 200px;
  font-family: 'Noto Sans KR', sans-serif;
  background: #fd92ae;
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
