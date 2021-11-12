import {
  Flex,
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
import { MdMenu as MenuIcon, MdNotificationsNone as NotificationIcon } from 'react-icons/md';

import ToggleThemeButton from '@src/components/toggle-theme-button';
import Logo from '@src/components/logo';

interface IAdminHeaderProps {
  setOpenDrawer: any;
}

export const AdminHeader = ({ setOpenDrawer }: IAdminHeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return (
    <Flex
      as="nav"
      py={1}
      px={5}
      w="100%"
      bg={colorMode === 'light' ? 'gray.300' : 'gray.900'}
      align="center"
    >
      <Logo />
      <Spacer />

      <Box>
        <Stack direction="row" spacing={4}>
          <ToggleThemeButton />

          <IconButton
            aria-label="menu-icon"
            variant="ghost"
            rounded="xl"
            color="primary.500"
            icon={<NotificationIcon fontSize={24} />}
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
              color="gray.600"
              _focus={{ border: 'none' }}
              _hover={{ background: 'transparent' }}
              icon={<MenuIcon fontSize={24} />}
              onClick={() => setOpenDrawer(true)}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  );
};
