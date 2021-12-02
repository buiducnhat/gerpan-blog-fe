import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react';

import styles from './style';
import Input from './components/input';
import Button from './components/button';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const overrides = {
  config,
  styles,
  fonts: {
    heading: 'Noto Sans Display',
    body: 'Noto Sans Display'
  },
  colors: {
    primary: baseTheme.colors.purple,
    secondary: baseTheme.colors.teal
  },
  shadows: {
    outline: '0 0 0 3px var(--chakra-colors-purple-300)'
  },
  components: {
    Input,
    Button
  }
};

export default extendTheme(overrides);
