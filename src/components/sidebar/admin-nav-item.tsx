import React, { useState } from 'react';
import {
  Text,
  ListItem,
  ListIcon,
  Flex,
  Collapse,
  List,
  Spacer,
  ListItemProps
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiChevronDown as DownIcon, FiChevronUp as UpIcon } from 'react-icons/fi';

export interface INavItemProps {
  title: string;
  href?: string;
  icon: any;
  nested?: {
    title: string;
    href: string;
    icon: any;
  }[];
}

export interface IStyledListItemProps extends ListItemProps {
  onClick?: any;
  children: React.ReactNode;
}

const StyledListItem = ({ onClick, children, ...rest }: IStyledListItemProps) => {
  return (
    <ListItem
      p={3}
      mb={1}
      borderRadius="xl"
      cursor="pointer"
      _hover={{ background: 'primary.500', color: 'white' }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ListItem>
  );
};

export const NavItem = ({ title, href, icon: Icon, nested }: INavItemProps) => {
  const [isOpenNested, setIsOpenNested] = useState(false);

  return (
    <>
      <Link href={href || ''} passHref>
        <StyledListItem onClick={() => setIsOpenNested(!isOpenNested)}>
          <Flex direction="row" align="center">
            <ListIcon as={Icon} />
            <Text>{title}</Text>
            <Spacer />
            {nested ? isOpenNested ? <UpIcon /> : <DownIcon /> : null}
          </Flex>
        </StyledListItem>
      </Link>

      {nested && (
        <Collapse in={isOpenNested}>
          <List pl={6}>
            {nested.map((nestedItem) => (
              <Link key={nestedItem.title} href={nestedItem.href || ''} passHref>
                <StyledListItem mb={0}>
                  <ListIcon as={nestedItem.icon} />
                  {nestedItem.title}
                </StyledListItem>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
