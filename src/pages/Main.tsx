import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 30px;

  h1 {
    font-weight: bolder;
    font-size: 40px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: bold;
    border: 3px solid ${({ theme }) => theme.colors.line};
    border-radius: 30px;
    padding: 10px;
  }
`;

const Main = () => {
  return (
    <StyledMain>
      <h1>Simple Quiz</h1>
      <Link to='option/categorie'>Start!</Link>
    </StyledMain>
  );
};

export default Main;
