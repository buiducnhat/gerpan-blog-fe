import { useState } from 'react';
import {
  Flex,
  Container,
  Spacer,
  Avatar,
  Box,
  IconButton,
  Stack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode
} from '@chakra-ui/react';
import { MdMenu as MenuIcon } from 'react-icons/md';
import { FaBell as NotificationIcon, FaSearch as SearchIcon } from 'react-icons/fa';
import { useRouter } from 'next/router';

import Logo from '@src/components/logo';
import ToggleThemeButton from '@src/components/toggle-theme-button';

interface IAdminHeaderProps {
  setOpenDrawer: any;
}

export default function MainHeader({ setOpenDrawer }: IAdminHeaderProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const router = useRouter();

  const [search, setSearch] = useState<string>('');

  return (
    <Box
      w="100%"
      h="12"
      pos="sticky"
      top="0"
      zIndex="banner"
      bg={colorMode === 'light' ? 'white' : 'gray.900'}
    >
      <Container maxW="container.xl" h="100%">
        <Flex as="nav" py="1" px={{ base: '0', md: '3' }} w="100%" align="center">
          <Logo />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push({ query: { ...router.query, search } });
            }}
          >
            <FormControl px="5" w="md">
              <InputGroup>
                <Input
                  placeholder={'Search for articles'}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightElement>
                  <SearchIcon color="GrayText" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>

          <Spacer />

          <Box>
            <Stack direction="row" spacing={4}>
              <ToggleThemeButton />

              <IconButton
                aria-label="menu-icon"
                variant="ghost"
                rounded="xl"
                size="md"
                fontSize="lg"
                color="primary.500"
                icon={<NotificationIcon />}
              />
              <Menu>
                <MenuButton>
                  <Avatar size="sm" src={''} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={() => alert('Logout!')}>Logout</MenuItem>
                </MenuList>
              </Menu>

              {isMobile && (
                <IconButton
                  aria-label="menu-icon"
                  variant="ghost"
                  color="GrayText"
                  size="md"
                  fontSize="lg"
                  _focus={{ border: 'none' }}
                  _hover={{ background: 'transparent' }}
                  icon={<MenuIcon />}
                  onClick={() => setOpenDrawer(true)}
                />
              )}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
