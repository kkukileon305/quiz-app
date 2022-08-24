import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Quiz } from '../hooks/useQuizFetch';
import ChooseBtn from './ChooseBtn';

const StyledContainer = styled.div<{ length: number; quizNum: number; height: number }>`
  width: 100%;
  overflow-x: hidden;

  h2 {
    width: calc(100% - 40px);
    font-size: 30px;
    font-weight: bold;
    margin: 20px 20px 0 20px;

    @media screen and (min-width: 600px) {
    }
  }

  ul {
    display: flex;
    align-items: flex-start;
    width: calc(100% * ${({ length }) => length});
    height: ${({ height }) => (height ? `${height}px` : 'fit-content')};
    transition: 0.3s;
    transform: translateX(calc(-100% * ${({ quizNum }) => quizNum} / ${({ length }) => length}));

    li {
      width: calc(100% / ${({ length }) => length});
      padding: 20px;

      p {
        font-size: 20px;
        line-height: calc(100% + 10px);
        margin-bottom: 40px;
      }
    }
  }

  div.btnContainer {
    display: flex;
    width: calc(100% - 40px);
    gap: 20px;
    margin: 20px 20px 40px 20px;

    button {
      width: 100%;
      border: none;
      background-color: ${({ theme }) => theme.colors.line};
      border: none;
      color: ${({ theme }) => theme.colors.focusText};
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      transition: 0.3s;

      &.result {
        background-color: ${({ theme }) => theme.colors.result};
      }
    }
  }
`;

type IQuizList = {
  quizs: Quiz[];
  userAns: string[][];
  setUserAns: React.Dispatch<React.SetStateAction<string[][]>>;
};

const QuizList = ({ quizs, setUserAns, userAns }: IQuizList) => {
  const [quizNum, setQuizNum] = useState(0);
  const [height, setHeight] = useState(0);
  const liListRef = useRef<(HTMLLIElement | null)[]>([]);
  const random1 = useRef(quizs.map(_ => Math.random() * 10));
  const random2 = useRef(quizs.map(_ => Math.random() * 10));
  const navigate = useNavigate();

  const nextHandler = () => {
    if (quizNum < quizs.length - 1) {
      setQuizNum(p => p + 1);
    } else if (quizNum === quizs.length - 1) {
      navigate('result');
    }
  };

  const prevHandler = () => {
    if (quizNum > 0) {
      setQuizNum(p => p - 1);
    }
  };

  const addAnswer = (i: number, answer: string) => {
    if (userAns) {
      const beforeAns = [...userAns];
      if (beforeAns[i][0] === answer) {
        beforeAns[i][0] = '';
      } else {
        beforeAns[i][0] = answer;
      }
      setUserAns(beforeAns);
    }
  };

  useEffect(() => {
    setHeight((liListRef.current[quizNum] as HTMLLIElement).getBoundingClientRect().height);
  }, [quizNum]);

  return (
    <StyledContainer length={quizs.length} quizNum={quizNum} height={height}>
      <h2>Q{quizNum + 1}</h2>
      <ul>
        {quizs.map((quiz, i) => (
          <li key={quiz.id} ref={el => (liListRef.current[i] = el)}>
            <p>{quiz.question}</p>
            {[quiz.correctAnswer, ...new Set(quiz.incorrectAnswers)]
              .sort((a, b) => a.length * random1.current[i] - b.length * random2.current[i])
              .map(answer => (
                <ChooseBtn //
                  key={answer}
                  onClick={() => addAnswer(i, answer)}
                  className={answer === userAns[i][0] ? 'ansBtn active' : 'ansBtn'}
                >
                  {answer}
                </ChooseBtn>
              ))}
          </li>
        ))}
      </ul>
      <div className='btnContainer'>
        <button className='prev' onClick={prevHandler}>
          Prev
        </button>
        <button className={quizNum === quizs.length - 1 ? 'result' : 'next'} onClick={nextHandler}>
          {quizNum === quizs.length - 1 ? 'Result' : 'Next'}
        </button>
      </div>
    </StyledContainer>
  );
};

export default QuizList;
