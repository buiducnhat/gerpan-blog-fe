import Link from 'next/link';
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

import { ArticleMetaKey, IArticleBasic } from '@src/models/article.interface';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleProps {
  article: IArticleBasic;
}

export const ArticleDetail = (props: IArticleProps) => {
  const { colorMode } = useColorMode();

  const { article } = props;

  return (
    <Box rounded="xl" overflow="hidden" bg={colorMode === 'light' ? 'white' : 'gray.700'}>
      <Image
        src={article.metas?.find((meta) => meta.key === ArticleMetaKey.BANNER)?.content}
        alt="placeholder"
        w="100%"
        h="sm"
        objectFit="cover"
      />

      <Box p={{ base: 3, md: 5, lg: 8 }}>
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
                <Text>{formatDate(article.createdAt, 'MMM, dd yyyy')}</Text>
              </HStack>

              <Button colorScheme="green" variant="outline" size="xs" leftIcon={<CategoryIcon />}>
                {article.category.title}
              </Button>
            </HStack>
          </VStack>
        </HStack>

        <Divider mb="5" />

        <Box
          dangerouslySetInnerHTML={{ __html: article.content }}
          sx={{
            h2: {
              fontSize: '16px'
            }
          }}
        />
      </Box>
    </Box>
  );
};
