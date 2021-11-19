import { Heading, HStack, Center } from '@chakra-ui/react';
import { FaExclamationCircle as ExclamationIcon } from 'react-icons/fa';

export default function ArticleNoData() {
  return (
    <Center h="70vh">
      <HStack>
        <ExclamationIcon
          fontSize="var(--chakra-fontSizes-4xl)"
          color="var(--chakra-colors-yellow-500)"
        />
        <Heading as="h2" textColor="yellow.500">
          {'No articles found'}
        </Heading>
      </HStack>
    </Center>
  );
}
