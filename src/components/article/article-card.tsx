import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorMode
} from '@chakra-ui/react';
import {
  FaCalendarAlt as CalendarIcon,
  FaTag as TagIcon,
  FaUserAlt as UserIcon
} from 'react-icons/fa';
import { format } from 'date-fns';

import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleCardProps {
  article: IArticleBasic;
}

export default function ArticleCard(props: IArticleCardProps) {
  const { colorMode } = useColorMode();

  const { article } = props;

  return (
    <Box
      mb={{ base: 8, md: 12 }}
      overflow="hidden"
      rounded="xl"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      boxShadow="xl"
    >
      <Link href={`/articles/${article.slug}`} passHref>
        <Image
          src={article.banner}
          alt="placeholder"
          w="100%"
          h={{ base: '48', md: '72' }}
          objectFit="cover"
          mb={3}
          cursor="pointer"
        />
      </Link>

      <Box p={5}>
        <HStack mb={3}>
          {article.tags.map((tag) => (
            <Tag key={tag.id} colorScheme="teal">
              {tag.title}
            </Tag>
          ))}
        </HStack>

        <Link href={`/articles/${article.slug}`} passHref>
          <Heading as="h2" fontSize="4xl" mb={5} cursor="pointer">
            {article.title}
          </Heading>
        </Link>

        <HStack mb={3}>
          <Tag variant="subtle" colorScheme="purple" size="lg" cursor="pointer">
            <TagLeftIcon boxSize="3" as={UserIcon}></TagLeftIcon>
            <TagLabel>
              {CommonUtil.getFullName(article.author.firstName, article.author.lastName)}
            </TagLabel>
          </Tag>

          <Tag variant="subtle" colorScheme="purple" size="lg" cursor="pointer">
            <TagLeftIcon boxSize="3" as={TagIcon}></TagLeftIcon>
            <TagLabel>{article.category.title}</TagLabel>
          </Tag>

          <Tag variant="subtle" colorScheme="purple" size="lg">
            <TagLeftIcon boxSize="3" as={CalendarIcon}></TagLeftIcon>
            <TagLabel>{format(new Date(article.createdAt), 'MMMM dd yyyy')}</TagLabel>
          </Tag>
        </HStack>

        <Text color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>{article.description}</Text>
      </Box>
    </Box>
  );
}
