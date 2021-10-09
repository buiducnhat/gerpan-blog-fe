import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Box,
  Avatar,
  Image,
  Heading,
  HStack,
  VStack,
  Divider,
  Text,
  Button,
  useColorMode
} from '@chakra-ui/react';
import { FaCalendar as CalendarIcon, FaBookmark as CategoryIcon } from 'react-icons/fa';
import { format as formatDate } from 'date-fns';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { MainRightSideBar } from '@src/components/sidebar/main-right-sidebar';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { __userMock } from '@src/__mocks__/user.mock';
import { __articleMock } from '@src/__mocks__/articles.mock';
import { __articleTagsMock } from '@src/__mocks__/article-tags.mock';
import { CommonUtil } from '@src/utils/common.util';
import { ArticleMetaKey } from '@src/models/article.interface';

export default function ArticlePage() {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const articleSlug = router.query['article-slug'] as string;

  useEffect(() => {
    if (articleSlug) {
      const articleId = CommonUtil.getIdFromSlug(articleSlug);
    }
  }, [articleSlug]);

  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          <Box rounded="xl" overflow="hidden" bg={colorMode === 'light' ? 'white' : 'gray.700'}>
            <Image
              src={__articleMock.metas?.find((meta) => meta.key === ArticleMetaKey.BANNER)?.content}
              alt="placeholder"
              w="100%"
              h="sm"
              objectFit="cover"
            />

            <Box p={5}>
              <Heading as="h1" mb="3">
                {__articleMock.title}
              </Heading>

              <HStack mb="5">
                {__articleMock.tags.map((tag) => (
                  <Button key={tag.id} variant="outline" colorScheme="blue" size="xs">
                    {tag.title}
                  </Button>
                ))}
              </HStack>

              <HStack mb={5}>
                <Avatar src={__articleMock.author.avatar} size="md" />

                <VStack align="flex-start">
                  <Text color="primary.500" fontWeight="black" fontSize="16">
                    {CommonUtil.getFullName(
                      __articleMock.author.firstName,
                      __articleMock.author.lastName
                    )}
                  </Text>

                  <HStack spacing="3">
                    <HStack color="GrayText">
                      <CalendarIcon fontSize="sm" />
                      <Text>{formatDate(__articleMock.createdAt, 'MMM, dd yyyy')}</Text>
                    </HStack>

                    <Button
                      colorScheme="green"
                      variant="outline"
                      size="xs"
                      leftIcon={<CategoryIcon />}
                    >
                      {__articleMock.category.title}
                    </Button>
                  </HStack>
                </VStack>
              </HStack>

              <Divider mb="5" />

              <Box
                dangerouslySetInnerHTML={{ __html: __articleMock.content }}
                sx={{
                  h2: {
                    fontSize: '16px'
                  }
                }}
              />
            </Box>
          </Box>
        </CustomColumn>
        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}
