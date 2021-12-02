import { useRouter } from 'next/router';
import {
  Box,
  Image,
  Heading,
  HStack,
  Avatar,
  VStack,
  Divider,
  useColorMode,
  TagLeftIcon,
  TagLabel,
  Tag
} from '@chakra-ui/react';
import {
  FaCalendarAlt as CalendarIcon,
  FaBookmark as CategoryIcon,
  FaHashtag as TagIcon
} from 'react-icons/fa';
import { format as formatDate } from 'date-fns';

import Markdown from './markdown';
import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';
import TagWithHover from '@src/components/tag-with-hover';

export interface IArticleDetailProps {
  article: IArticleBasic;
}

export default function ArticleDetail(props: IArticleDetailProps) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const { article } = props;

  return (
    <Box
      rounded="xl"
      overflow="hidden"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      shadow="xl"
    >
      <Image
        src={article.banner}
        alt="placeholder"
        w="100%"
        h={{ base: '3xs', md: 'sm' }}
        objectFit="cover"
      />

      <Box p={{ base: 3, md: 5, lg: 10 }}>
        <Heading as="h1" mb="3">
          {article.title}
        </Heading>

        <HStack mb="5">
          {article.tags.map((tag) => (
            <TagWithHover
              key={tag.id}
              colorScheme="orange"
              onClick={() =>
                router.push({
                  pathname: '/articles',
                  query: { tag: tag.id }
                })
              }
            >
              <TagLeftIcon as={TagIcon}></TagLeftIcon>
              <TagLabel>{tag.title}</TagLabel>
            </TagWithHover>
          ))}
        </HStack>

        <HStack mb={5} spacing="3">
          <Avatar src={article.author.avatar} size="lg" />

          <VStack align="flex-start">
            <TagWithHover colorScheme="teal" size="lg" hoverBackground="teal.500">
              <TagLabel>
                {CommonUtil.getFullName(article.author.firstName, article.author.lastName)}
              </TagLabel>
            </TagWithHover>

            <HStack spacing="3">
              <Tag colorScheme="gray" size="lg">
                <TagLeftIcon as={CalendarIcon} />
                <TagLabel>{formatDate(new Date(article.createdAt), 'MMM, dd yyyy')}</TagLabel>
              </Tag>

              <TagWithHover
                colorScheme="blue"
                size="lg"
                hoverBackground="blue.500"
                onClick={() =>
                  router.push({ pathname: '/articles', query: { category: article.category.id } })
                }
              >
                <TagLeftIcon as={CategoryIcon} />
                <TagLabel>{article.category.title}</TagLabel>
              </TagWithHover>
            </HStack>
          </VStack>
        </HStack>

        <Divider mb="5" />

        <Markdown content={article.content} />
      </Box>
    </Box>
  );
}
