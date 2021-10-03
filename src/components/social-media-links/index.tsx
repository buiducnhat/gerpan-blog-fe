import { ButtonGroup, ButtonGroupProps, IconButton, useColorMode } from '@chakra-ui/react';
import { CommonUtil } from '@src/utils/common.util';
import * as React from 'react';
import { FaGithub, FaFacebook } from 'react-icons/fa';

export const SocialMediaLinks = (props: ButtonGroupProps) => {
  const { colorMode } = useColorMode();

  return (
    <ButtonGroup variant="ghost" color="gray.600" {...props}>
      <IconButton
        as="a"
        target="_blank"
        href="https://github.com/gerpann"
        aria-label="GitHub"
        color={colorMode === 'light' ? 'black' : 'white'}
        rounded="xl"
        icon={<FaGithub fontSize="20px" />}
      />
      <IconButton
        as="a"
        target="_blank"
        href="https://www.facebook.com/gerpan.4701/"
        aria-label="Facebook"
        color="facebook.500"
        rounded="xl"
        icon={<FaFacebook fontSize="20px" />}
      />
    </ButtonGroup>
  );
};
