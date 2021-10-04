import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import "@fontsource/noto-sans-display"

import theme from '@src/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;