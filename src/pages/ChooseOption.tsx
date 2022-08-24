import { useEffect, useState } from 'react';
import { AiOutlineSwapLeft, AiOutlineSwapRight } from 'react-icons/ai';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChooseBtn from '../components/ChooseBtn';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setOption } from '../redux/slices/option';

const StyledPage = styled.main<{ open: boolean }>`
  padding: 20px;
  h2 {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
  }

  div.menuContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: 0.3s;
    position: relative;
    overflow: hidden;

    button.open {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 100px;
      padding: 0;
      text-align: center;
      font-size: 20px;
      border: none;
      color: ${({ theme }) => theme.colors.text};
      font-weight: bolder;
      background: linear-gradient(180deg, ${({ theme }) => theme.colors.body}00 0%, ${({ theme }) => theme.colors.body} 100%);
      visibility: ${({ open }) => (open ? 'hidden' : 'visible')};
      opacity: ${({ open }) => (open ? '0' : '1')};
      transition: 0.3s;
      transition-delay: 0.3s;

      @media screen and (min-height: 870px) {
        display: none;
      }
    }

    button.menu {
      display: block;
      border: 2px solid ${({ theme }) => theme.colors.line};
      background-color: transparent;
      text-align: left;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
      transition: 0.3s;

      &.focused {
        background-color: ${({ theme }) => theme.colors.focusMenu};
        color: ${({ theme }) => theme.colors.focusText};
      }
    }

    &.categories {
      height: ${({ open }) => (open ? '560px' : 'calc(100vh - 310px)')};
      overflow-y: hidden;
    }
  }

  div.buttonContainer {
    display: flex;
    gap: 20px;
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

  p.error {
    margin: 20px 0;
    font-weight: bold;
    font-size: 20px;
  }

  div.area {
    margin: 20px 0;
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
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(5);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [cateDisable, setCateDisable] = useState(true);
  const [diffDisable, setDiffDisable] = useState(true);

  useEffect(() => {
    option.categorie ? setCateDisable(false) : setCateDisable(true);
    option.difficulty ? setDiffDisable(false) : setDiffDisable(true);
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

  const back = () => {
    if (pathname === '/option/difficulty') {
      navigate('/option/categorie');
    } else if (pathname === '/option/limit') {
      navigate('/option/difficulty');
    }
  };

  return (
    <StyledPage open={open}>
      <Routes>
        <Route
          path='categorie'
          element={
            <>
              <h2>Choose categorie!</h2>
              <div className='menuContainer categories'>
                <button className='open' onClick={() => setOpen(true)}>
                  <BsChevronDoubleDown size={30} />
                </button>

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
              {cateDisable ? <p className='error'>Please choose option</p> : <div className='area'></div>}
              <div className='buttonContainer'>
                <ChooseBtn width='calc(50% - 10px)' onClick={back} disabled={true}>
                  <AiOutlineSwapLeft />
                  Prev
                </ChooseBtn>
                <ChooseBtn //
                  width='calc(50% - 10px)'
                  disabled={cateDisable}
                  onClick={() => navigate('/option/difficulty')}
                >
                  Next
                  <AiOutlineSwapRight />
                </ChooseBtn>
              </div>
            </>
          }
        />
        <Route
          path='difficulty'
          element={
            <>
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
              {diffDisable ? <p className='error'>Please choose option</p> : <div className='area'></div>}
              <div className='buttonContainer'>
                <ChooseBtn onClick={back}>
                  <AiOutlineSwapLeft />
                  Prev
                </ChooseBtn>
                <ChooseBtn disabled={diffDisable} onClick={() => navigate('/option/limit')}>
                  Next
                  <AiOutlineSwapRight />
                </ChooseBtn>
              </div>
            </>
          }
        />

        <Route
          path='limit'
          element={
            <>
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
              <div className='buttonContainer'>
                <ChooseBtn onClick={back}>
                  <AiOutlineSwapLeft />
                  Prev
                </ChooseBtn>
                <ChooseBtn onClick={() => navigate('/quiz')}>
                  Next
                  <AiOutlineSwapRight />
                </ChooseBtn>
              </div>
            </>
          }
        />
      </Routes>
    </StyledPage>
  );
};

export default ChooseOption;
