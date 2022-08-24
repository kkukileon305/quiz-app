import { Route, Routes } from 'react-router-dom';
import QuizList from '../../components/QuizList';
import QuizSkeleton from '../../components/QuizSkeleton';
import useQuizFetch from '../../hooks/useQuizFetch';
import Result from './Result';

const Quiz = () => {
  const { quizs, loading, error, correctAns, setUserAns, userAns } = useQuizFetch();

  return (
    <>
      <Routes>
        <Route
          path=''
          element={
            error ? (
              <p>비정상적인 접근</p>
            ) : loading || (userAns && !userAns.length) ? ( //
              <QuizSkeleton />
            ) : (
              <QuizList //
                quizs={quizs}
                setUserAns={setUserAns}
                userAns={userAns}
              />
            )
          }
        />
        <Route
          path='result'
          element={
            <Result //
              quizs={quizs}
              correctAns={correctAns}
              userAns={userAns}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Quiz;
