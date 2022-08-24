import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiSun } from 'react-icons/bi';
import { BsLightning, BsMoon } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../hooks/useTheme';

const StyledNav = styled.nav<{ menu: boolean; pathname: string }>`
  position: ${({ pathname }) => (pathname === '/' ? 'fixed' : 'relative')};
  top: 0;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  z-index: 10;

  button {
    border: none;
    border-radius: 10px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.line};
    border: 3px solid ${({ theme }) => theme.colors.line};
    width: 50px;
    height: 50px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.themeMenu {
    position: absolute;
    right: 20px;
    top: 100%;
    transition: 0.3s;
    transform-origin: 100% -10px;
    opacity: ${({ menu }) => (menu ? '1' : '0')};
    visibility: ${({ menu }) => (menu ? 'visible' : 'hidden')};
    transform: scale(${({ menu }) => (menu ? '1' : '0.5')});
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.4));

    ul {
      border-radius: 10px;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.themeMenu};
        color: ${({ theme }) => theme.colors.themeText};
        font-weight: bold;
        font-size: 20px;
        gap: 10px;
        cursor: pointer;
      }
    }

    div.tail {
      position: absolute;
      top: -10px;
      right: 10px;
      border-bottom: 10px solid ${({ theme }) => theme.colors.themeMenu};
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
    }
  }
`;

const Nav = ({ switchTheme }: { switchTheme: (name: Theme) => void }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (target instanceof Element && !target.closest('button.theme')) {
        setMenu(false);
      }
    };

    window.addEventListener('click', clickHandler);
    return () => window.removeEventListener('click', clickHandler);
  }, []);

  return (
    <StyledNav //
      menu={menu}
      pathname={pathname}
    >
      <button className='theme' onClick={() => setMenu(!menu)}>
        <BiSun size={40} />
      </button>
      {pathname === '/' || (
        <button onClick={() => navigate('/')}>
          <AiOutlineHome size={40} />
        </button>
      )}

      <div className='themeMenu'>
        <ul>
          <li onClick={() => switchTheme('light')}>
            <BsLightning size={24} />
            Light
          </li>
          <li onClick={() => switchTheme('dark')}>
            <BsMoon size={24} />
            Dark
          </li>
        </ul>
        <div className='tail' />
      </div>
    </StyledNav>
  );
};

export default Nav;
