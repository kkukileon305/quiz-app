import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  colors: {
    body: '#EDEEF7',
    text: '#0D3F67',
    themeMenu: '#0D3F67',
    themeText: '#eeeeee',
    line: '#0D3F67',
    focusMenu: '#0D3F67',
    focusText: '#eeeeee',
    disabled: '#E0E0E0',
    result: '#FF9551',
  },
};

const dark: DefaultTheme = {
  colors: {
    body: '#1C3879',
    text: '#ffffff',
    themeMenu: '#ffffff',
    themeText: '#1C3879',
    line: '#eeeeee',
    focusMenu: '#ffffff',
    focusText: '#1C3879',
    disabled: '#2B4865',
    result: '#FF9551',
  },
};

export default { light, dark };
