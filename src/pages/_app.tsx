import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/noto-sans-display';

import theme from '@src/theme';
import { store } from '@src/redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default MyApp;
