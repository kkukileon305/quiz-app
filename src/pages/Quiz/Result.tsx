import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ChooseBtn from '../../components/ChooseBtn';
import { Quiz } from '../../hooks/useQuizFetch';

const StyledPage = styled.main`
  padding: 20px;

  h2 {
    font-size: 30px;
    font-weight: bold;
  }
  div.score {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
  }

  ul.resultContainer {
    margin-top: 20px;

    li {
      padding: 20px 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.line};

      div.sum {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      div.detail {
        p.question {
          font-size: 20px;
          line-height: calc(100% + 10px);
          margin-bottom: 20px;
        }

        p.correctAns {
          font-size: 20px;
          line-height: calc(100% + 10px);
          text-align: right;
        }

        button {
          cursor: default;
        }
      }
    }
  }

  a {
    display: block;
    max-width: 600px;
    width: 100%;
    margin: auto;
    margin-top: 20px;
    border: none;
    background-color: ${({ theme }) => theme.colors.themeMenu};
    color: ${({ theme }) => theme.colors.themeText};
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    padding: 10px;
    transition: 0.3s;
    text-decoration: none;
  }
`;

interface IResult {
  correctAns: string[][];
  userAns: string[][];
  quizs: Quiz[];
}

const Result = ({ quizs, correctAns, userAns }: IResult) => {
  const score = useRef(correctAns.map((ans, i) => ans[0] === userAns[i][0]).filter(res => res).length);

  return (
    <StyledPage>
      <h2 onClick={() => console.log(score.current)}>Result</h2>
      <div className='score'>
        <h2>Score</h2>{' '}
        <h2>
          {score.current} / {quizs.length}
        </h2>
      </div>
      <ul className='resultContainer'>
        {quizs.map((quiz, i) => (
          <li key={quiz.id}>
            <div className='sum'>
              <h2>Q{i + 1}</h2>
              <h2>{correctAns[i][0] === userAns[i][0] ? 'O' : 'X'}</h2>
            </div>

            <div className='detail'>
              <p className='question'>{quiz.question}</p>
              <ChooseBtn className={correctAns[i][0] === userAns[i][0] ? 'active' : 'fail'}>Your Ans: {userAns[i][0]}</ChooseBtn>
              <p className='correctAns'>Correct Ans: {correctAns[i][0]}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link to='/option'>Back</Link>
    </StyledPage>
  );
};

export default Result;
