import { Heading, useTheme, useColorMode } from '@chakra-ui/react';

export interface ITitleHeadingProps {
  title: string;
}

export default function TitleHeading({ title, ...props }: ITitleHeadingProps) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Heading
      as="h2"
      fontSize="xl"
      letterSpacing="widest"
      textTransform="uppercase"
      w="fit-content"
      mb={3}
      boxShadow={`inset 0 -${theme.sizes['2']} 0 ${
        theme.colors.primary[colorMode === 'light' ? 300 : 600]
      }`}
      {...props}
    >
      {title}
    </Heading>
  );
}
