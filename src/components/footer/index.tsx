import * as React from 'react';
import { Box, Container, Stack, useColorMode } from '@chakra-ui/react';

import Copyright from '@src/components/copyright';
import Logo from '@src/components/logo';
import SocialMediaLinks from '@src/components/social-media-links';

export const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box py={5} bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}>
      <Container as="footer" maxW="container.xl">
        <Stack>
          <Stack direction="row" spacing="4" align="center" justify="space-between">
            <Logo />
            <SocialMediaLinks />
          </Stack>
          <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
        </Stack>
      </Container>
    </Box>
  );
};
