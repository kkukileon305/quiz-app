import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.body};
  }

  #root {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.text};
    min-height: calc(100vh - 90px);
    max-width: 1100px;
    width: 100%;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
