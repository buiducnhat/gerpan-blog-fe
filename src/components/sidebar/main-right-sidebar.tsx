import { Box, VStack } from '@chakra-ui/react';

import { IUserBasic } from '@src/models/user.model';
import ArticleCategoryList from './article-category-list';
import AboutMe from './about-me';
import { IArticleCategoryBasic } from '@src/models/article-category.model';

export interface IMainLeftSidebarProps {
  user: IUserBasic;
  articleCategories: IArticleCategoryBasic[];
}

export default function MainRightSideBar({ user, articleCategories }: IMainLeftSidebarProps) {
  return (
    <VStack position="sticky" top="16">
      <AboutMe user={user} />

      <Box h="5" />

      <ArticleCategoryList categories={articleCategories} />
    </VStack>
  );
}
