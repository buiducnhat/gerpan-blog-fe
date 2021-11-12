import React from 'react';
import {
  Avatar,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  Stack,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react';
import {
  FiHome as HomeIcon,
  FiUsers as UsersIcon,
  FiFileText as PostsIcon,
  FiBookmark as CategoryIcon,
  FiTag as TagIcon,
  FiEdit as ArticleIcon
} from 'react-icons/fi';
import NavItem from './admin-nav-item';

const items = [
  {
    title: 'Home',
    href: '/admin',
    icon: HomeIcon
  },
  {
    title: 'Users Manager',
    href: '/admin/users',
    icon: UsersIcon
  },
  {
    title: 'Article Manager',
    // href: '/admin/posts',
    icon: PostsIcon,
    nested: [
      {
        title: 'Article category',
        href: '/admin/articles/categories',
        icon: CategoryIcon
      },
      {
        title: 'Article tag',
        href: '/admin/articles/tags',
        icon: TagIcon
      },
      {
        title: 'Article',
        href: '/admin/articles',
        icon: ArticleIcon
      }
    ]
  }
];

interface IAdminSidebarProps {
  openDrawer: boolean;
  setOpenDrawer: any;
}

export default function AdminSidebar({ openDrawer, setOpenDrawer }: IAdminSidebarProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();

  return isMobile ? (
    <MyDrawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />
  ) : (
    <List minW="256px" p={2} bg={colorMode === 'light' ? 'gray.100' : 'blackAlpha.200'}>
      {items.map((item) => (
        <NavItem
          key={item.title}
          title={item.title}
          href={item.href}
          icon={item.icon}
          nested={item.nested}
        />
      ))}
    </List>
  );
}

const MyDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
  return (
    <Drawer placement="left" size="xs" onClose={() => setIsOpen(false)} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Stack align="center">
            <Avatar />
            <Text>Bui Duc Nhat</Text>
          </Stack>
        </DrawerHeader>
        <DrawerBody>
          <List w="100%">
            {items.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                href={item.href}
                icon={item.icon}
                nested={item.nested}
              />
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
