import { Box, Heading } from '@chakra-ui/react';

export default function Logo({ ...props }) {
  return (
    <Box {...props}>
      <Heading size="md">Gerpan</Heading>
    </Box>
  );
}
