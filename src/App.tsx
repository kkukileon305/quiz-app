import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Nav from './components/Nav';
import GlobalStyle from './GlobalStyle';
import useTheme from './hooks/useTheme';
import ChooseOption from './pages/ChooseOption';
import Main from './pages/Main';
import Quiz from './pages/Quiz';

const App = () => {
  const { theme, switchTheme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav switchTheme={switchTheme} />
        <Routes>
          <Route path='' element={<Main />} />
          <Route path='option/*' element={<ChooseOption />} />
          <Route path='quiz/*' element={<Quiz />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
