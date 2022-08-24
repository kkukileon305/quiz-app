import 'styled-components';
import { Color, light } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      body: string;
      text: string;
      line: string;
      themeMenu: string;
      themeText: string;
      focusMenu: string;
      focusText: string;
      disabled: string;
      result: string;
    };
  }
}
