import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setOption } from '../redux/slices/option';

const StyledPage = styled.main`
  padding: 20px;

  div.form {
    h2 {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 20px;
    }

    div.menuContainer {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 40px;

      button.menu {
        display: block;
        border: 2px solid ${({ theme }) => theme.colors.line};
        background-color: transparent;
        text-align: left;
        padding: 10px;
        font-size: 20px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text};

        &.focused {
          background-color: ${({ theme }) => theme.colors.focusMenu};
          color: ${({ theme }) => theme.colors.focusText};
        }
      }
    }

    input[type='range'] {
      width: 100%;
      height: 30px;
      padding: 0;
      margin: 0;
      -webkit-appearance: none;
      background-color: transparent;
      margin-bottom: 20px;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        margin-top: -8px;
        background-color: ${({ theme }) => theme.colors.themeText};
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.line};
        cursor: pointer;
      }

      &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        background-color: ${({ theme }) => theme.colors.line};
        height: 4px;
        border-radius: 2px;
      }
    }
  }

  & > p {
    margin: 10px 0;
    font-weight: bold;
    font-size: 20px;
  }

  div.area {
    margin: 10px 0;
    height: 20px;
  }

  button.start {
    display: block;
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.themeMenu};
    color: ${({ theme }) => theme.colors.themeText};
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    padding: 10px;
    margin-bottom: 60px;
    transition: 0.3s;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
    }
  }
`;

const categories = ['Arts & Literature', 'Film & TV', 'Food & Drink', 'General Knowledge', 'Geography', 'History', 'Music', 'Science', 'Society & Culture', 'Sport & Leisure'];
const difficulties = ['easy', 'medium', 'hard'];

const ChooseOption = () => {
  const dispatch = useAppDispatch();
  const option = useAppSelector(({ option }) => option);
  const [value, setValue] = useState(5);
  const [disalbed, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (option.categorie && option.difficulty && option.limit) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [option]);

  const setCategorie = (categorie: string) => {
    if (categorie === option.categorie) {
      dispatch(setOption({ ...option, categorie: '' }));
    } else {
      dispatch(setOption({ ...option, categorie }));
    }
  };

  const setDifficulty = (difficulty: string) => {
    if (difficulty === option.difficulty) {
      dispatch(setOption({ ...option, difficulty: '' }));
    } else {
      dispatch(setOption({ ...option, difficulty }));
    }
  };

  const clickHandler = () => {
    navigate('/quiz');
  };

  return (
    <StyledPage>
      <div className='form'>
        <h2>Choose categorie!</h2>
        <div className='menuContainer'>
          {categories.map(categorie => (
            <button //
              className={option.categorie === categorie ? 'menu focused' : 'menu'}
              key={categorie}
              onClick={() => setCategorie(categorie)}
            >
              {categorie}
            </button>
          ))}
        </div>

        <h2>Choose Difficulty!</h2>
        <div className='menuContainer'>
          {difficulties.map(difficulty => (
            <button //
              key={difficulty}
              className={option.difficulty === difficulty ? 'menu focused' : 'menu'}
              onClick={() => setDifficulty(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <h2>Limit {value}</h2>
        <input //
          type='range'
          min={1}
          max={10}
          onChange={e => {
            setValue(Number((e.target as HTMLInputElement).value));
            dispatch(
              setOption({
                ...option,
                limit: Number((e.target as HTMLInputElement).value),
              })
            );
          }}
          defaultValue={5}
        />
      </div>
      {disalbed ? <p>Please check all option!</p> : <div className='area' />}
      <button className='start' disabled={disalbed} onClick={clickHandler}>
        Start!
      </button>
    </StyledPage>
  );
};

export default ChooseOption;
