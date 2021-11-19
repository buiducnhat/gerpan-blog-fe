import { extendTheme, theme as baseTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.100', 'gray.800')(props),
        scrollBehavior: 'smooth'
      }
    })
  },
  fonts: {
    heading: 'Noto Sans Display',
    body: 'Noto Sans Display'
  },
  colors: {
    primary: baseTheme.colors.purple,
    secondary: baseTheme.colors.teal
  }
});

export default theme;
