import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/noto-sans-display';

import theme from '@src/theme';
import { AppContext } from '@src/context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContext.Provider value={{ user: null }}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default MyApp;
