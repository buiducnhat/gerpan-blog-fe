import { Box, Avatar, Heading, VStack } from '@chakra-ui/react';
import { IUserBasic } from '@src/models/user.interface';
import { CommonUtil } from '@src/utils/common.util';

export interface IMainLeftSidebarProps {
  user: IUserBasic;
}

export const MainLeftSideBar = ({ user }: IMainLeftSidebarProps) => {
  return (
    <Box>
      <VStack>
        <Avatar src={user.avatar} size="2xl" />

        <Box mt="1" fontWeight="semibold" fontSize="xl" as="h4" lineHeight="tight">
          {CommonUtil.getFullName(user.firstName, user.lastName)}
        </Box>

        <Box fontSize="md" as="span" lineHeight="tight">
          {user.about}
        </Box>
      </VStack>
    </Box>
  );
};
