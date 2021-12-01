import NextLink from 'next/link';
import { Box, Text, useColorMode, VStack, HStack, Button, Spacer } from '@chakra-ui/react';
import { FaBookmark as CategoryIcon } from 'react-icons/fa';

import TitleHeading from '@src/components/title-heading';
import { IArticleBasic } from '@src/models/article.model';
import { useRouter } from 'next/router';

export interface IArticleTableContentProps {
  content: string;
}

export interface IHeadingTableContent {
  id: string;
  title: string;
  children?: IHeadingTableContent[];
}

export interface IArticlesSameAuthorProps {
  articles: IArticleBasic[];
}

export default function ArticlesSameAuthor({ articles }: IArticlesSameAuthorProps) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <Box mt="8">
      <TitleHeading title={'Same author'} />

      <VStack>
        {articles.map((__article) => (
          <Box
            key={__article.id}
            w="100%"
            p="3"
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
            rounded="xl"
          >
            <NextLink href={__article.slug || '/404'} passHref>
              <Text as={'a'} _hover={{ color: 'primary.500' }}>
                {__article.title}
              </Text>
            </NextLink>

            <Spacer h="2" />

            <HStack flex="space-between">
              <Button
                colorScheme="green"
                variant="outline"
                size="xs"
                leftIcon={<CategoryIcon />}
                onClick={() =>
                  router.push({ pathname: '/articles', query: { category: __article.category.id } })
                }
              >
                {__article.category.title}
              </Button>

              <HStack>
                {__article.tags.map((__tag) => (
                  <Button
                    key={__tag.id}
                    variant="outline"
                    colorScheme="blue"
                    size="xs"
                    onClick={() =>
                      router.push({
                        pathname: '/articles',
                        query: { tag: __tag.id }
                      })
                    }
                  >
                    {__tag.title}
                  </Button>
                ))}
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
