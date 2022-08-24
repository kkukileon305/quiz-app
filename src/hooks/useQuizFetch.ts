import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export interface Quiz {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  type: string;
  difficulty: string;
  regions: string[];
}

const useQuizFetch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { categorie, difficulty, limit } = useAppSelector(({ option }) => option);
  const [quizs, setQuizs] = useState<Quiz[]>([]);

  const [userAns, setUserAns] = useState<string[][]>([['']]);
  const [correctAns, setCorrectAns] = useState<string[][]>([['']]);

  const navigate = useNavigate();

  useEffect(() => {
    if (categorie && difficulty && limit) {
      (async () => {
        setLoading(true);
        try {
          const url = `https://the-trivia-api.com/api/questions?categories=${categorie.toLocaleLowerCase().replaceAll(' ', '_')}&limit=${limit}&difficulty=${difficulty.toLocaleLowerCase()}`;
          const { data } = await axios.get<Quiz[]>(url);
          setQuizs(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      })();
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setUserAns(quizs.map(_ => ['']));
    setCorrectAns(quizs.map(quiz => [quiz.correctAnswer]));
  }, [quizs]);

  return { quizs, loading, error, userAns, setUserAns, correctAns };
};

export default useQuizFetch;
