import { Box, VStack, Divider, useColorMode } from '@chakra-ui/react';

import { IUserBasic } from '@src/models/user.model';
import ArticleCategoryList from './article-category-list';
import AboutMe from './about-me';
import { IArticleCategoryBasic } from '@src/models/article-category.model';

export interface IMainLeftSidebarProps {
  user: IUserBasic;
  articleCategories: IArticleCategoryBasic[];
}

export default function MainRightSideBar({ user, articleCategories }: IMainLeftSidebarProps) {
  const { colorMode } = useColorMode();

  return (
    <VStack
      position="sticky"
      top="16"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      rounded="xl"
      boxShadow="xl"
      p="5"
    >
      <AboutMe user={user} />

      <Box h="5" />
      <Divider />
      <Box h="5" />

      <ArticleCategoryList categories={articleCategories} />
    </VStack>
  );
}
