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
  Button,
  useColorMode
} from '@chakra-ui/react';
import { MdMenu as MenuIcon } from 'react-icons/md';
import {
  FaSearch as SearchIcon,
  FaUser as UserIcon,
  FaSignOutAlt as LogoutIcon
} from 'react-icons/fa';
import { useRouter } from 'next/router';

import Logo from '@src/components/logo';
import ToggleThemeButton from '@src/components/toggle-theme-button';
import LoginModal from '@src/components/auth-form/login-modal';
import { useGetMe } from '@src/hooks/auth.hook';
import { useAppDispatch } from '@src/hooks/redux.hook';
import { logout } from '@src/redux/auth/auth.slice';

interface IAdminHeaderProps {
  setOpenDrawer: any;
}

export default function MainHeader({ setOpenDrawer }: IAdminHeaderProps) {
  const dispatch = useAppDispatch();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const router = useRouter();

  const { isAuth, user } = useGetMe();

  const [search, setSearch] = useState<string>('');
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  return (
    <>
      <LoginModal isOpen={openLoginModal} setIsOpen={setOpenLoginModal} />

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
              <Stack direction="row" spacing="8">
                <ToggleThemeButton />
                {isAuth && !!user ? (
                  <Menu placement="bottom-start">
                    <MenuButton>
                      <Avatar size="sm" src={user.avatar} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem icon={<UserIcon />}>{'My profile'}</MenuItem>
                      <MenuItem icon={<LogoutIcon />} onClick={() => dispatch(logout())}>
                        {'Log out'}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    variant="link"
                    colorScheme="purple"
                    onClick={() => setOpenLoginModal(true)}
                  >
                    {'Login'}
                  </Button>
                )}

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
    </>
  );
}
