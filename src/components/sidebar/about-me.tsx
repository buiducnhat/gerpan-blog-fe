import { Box, Avatar, VStack } from '@chakra-ui/react';
import { IUserBasic } from '@src/models/user.model';
import { CommonUtil } from '@src/utils/common.util';
import TitleHeading from '@src/components/title-heading';

export interface IAboutMeProps {
  user: IUserBasic;
}

export default function AboutMe({ user }: IAboutMeProps) {
  return (
    <VStack>
      <TitleHeading title={'About me'} />

      <Avatar src={user.avatar} size="2xl" />

      <Box mt="1" fontWeight="semibold" fontSize="xl">
        {CommonUtil.getFullName(user.firstName, user.lastName)}
      </Box>

      <Box px={10} fontSize="md" fontWeight="bold" as="span" textAlign="center" color="GrayText">
        {user.bio}
      </Box>
    </VStack>
  );
}
