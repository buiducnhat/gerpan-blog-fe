import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, useColorMode, VStack, HStack, Spacer, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { FaBookmark as CategoryIcon, FaHashtag as TagIcon } from 'react-icons/fa';

import TitleHeading from '@src/components/title-heading';
import { IArticleBasic } from '@src/models/article.model';
import TagWithHover from '@src/components/tag-with-hover';

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
              <Box
                mb="1"
                as={'h3'}
                cursor="pointer"
                fontWeight="bold"
                transition="ease-in-out .15s"
                _hover={{ color: 'primary.500' }}
              >
                {__article.title}
              </Box>
            </NextLink>

            <Spacer h="2" />

            <HStack flex="space-between">
              <TagWithHover
                colorScheme="blue"
                hoverBackground="blue.500"
                variant="outline"
                onClick={() =>
                  router.push({ pathname: '/articles', query: { category: __article.category.id } })
                }
              >
                <TagLeftIcon as={CategoryIcon}></TagLeftIcon>
                <TagLabel>{__article.category.title}</TagLabel>
              </TagWithHover>

              <HStack>
                {__article.tags.map((__tag) => (
                  <TagWithHover
                    key={__tag.id}
                    colorScheme="orange"
                    hoverBackground="orange.500"
                    variant="outline"
                    onClick={() =>
                      router.push({
                        pathname: '/articles',
                        query: { tag: __tag.id }
                      })
                    }
                  >
                    <TagLeftIcon as={TagIcon}></TagLeftIcon>
                    <TagLabel>{__tag.title}</TagLabel>
                  </TagWithHover>
                ))}
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
