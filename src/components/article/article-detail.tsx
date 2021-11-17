import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Avatar,
  VStack,
  Divider,
  useColorMode
} from '@chakra-ui/react';
import { FaCalendarAlt as CalendarIcon, FaBookmark as CategoryIcon } from 'react-icons/fa';
import { format as formatDate } from 'date-fns';

import Markdown from './markdown';
import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleDetailProps {
  article: IArticleBasic;
}

export default function ArticleDetail(props: IArticleDetailProps) {
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
            <Button key={tag.id} variant="outline" colorScheme="blue" size="xs">
              {tag.title}
            </Button>
          ))}
        </HStack>

        <HStack mb={5}>
          <Avatar src={article.author.avatar} size="md" />

          <VStack align="flex-start">
            <Text color="primary.500" fontWeight="black" fontSize="16">
              {CommonUtil.getFullName(article.author.firstName, article.author.lastName)}
            </Text>

            <HStack spacing="3">
              <HStack color="GrayText">
                <CalendarIcon fontSize="sm" />
                <Text>{formatDate(new Date(article.createdAt), 'MMM, dd yyyy')}</Text>
              </HStack>

              <Button colorScheme="green" variant="outline" size="xs" leftIcon={<CategoryIcon />}>
                {article.category.title}
              </Button>
            </HStack>
          </VStack>
        </HStack>

        <Divider mb="5" />

        <Markdown content={article.content} />
      </Box>
    </Box>
  );
}
