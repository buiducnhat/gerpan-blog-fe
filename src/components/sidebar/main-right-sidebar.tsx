import { Box, VStack } from '@chakra-ui/react';

import { IUserBasic } from '@src/models/user.model';
import ArticleCategoryList from './article-category-list';
import AboutMe from './about-me';
import { __articleCategoriesMock } from '@src/__mocks__/article-categories.mock';

export interface IMainLeftSidebarProps {
  user: IUserBasic;
}

export default function MainRightSideBar({ user }: IMainLeftSidebarProps) {
  return (
    <VStack>
      <AboutMe user={user} />

      <Box h="5" />

      <ArticleCategoryList categories={__articleCategoriesMock} />
    </VStack>
  );
}
