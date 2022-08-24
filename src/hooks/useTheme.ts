import { useState } from 'react';
import { DefaultTheme } from 'styled-components';
import themes from '../theme';

export type Theme = keyof typeof themes;

const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes[(localStorage.getItem('theme') as Theme) || 'light']);

  const switchTheme = (name: Theme) => {
    localStorage.setItem('theme', name);
    setTheme(themes[name]);
  };

  return { theme, switchTheme };
};

export default useTheme;
