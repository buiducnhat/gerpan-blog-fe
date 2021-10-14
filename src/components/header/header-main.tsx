import Logo from '@src/components/logo';
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
  useColorMode
} from '@chakra-ui/react';
import { MdMenu as MenuIcon } from 'react-icons/md';
import { FaBell as NotificationIcon } from 'react-icons/fa';
import ToggleThemeButton from '@src/components/toggle-theme-button';

interface IAdminHeaderProps {
  setOpenDrawer: any;
}

export default function MainHeader({ setOpenDrawer }: IAdminHeaderProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return (
    <Box
      w="100%"
      pos="sticky"
      top="0"
      zIndex="banner"
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
    >
      <Container maxW="container.xl">
        <Flex as="nav" py="1" px={{ base: '0', md: '3' }} w="100%" align="center">
          <Logo color="primary.800" />
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
