import Link from 'next/link';
import { useRouter } from 'next/router';
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

import TagWithHover from '@src/components/tag-with-hover';
import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';

export interface IArticleCardProps {
  article: IArticleBasic;
}

export default function ArticleCard(props: IArticleCardProps) {
  const router = useRouter();
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
            <TagWithHover
              key={tag.id}
              colorScheme="teal"
              hoverBackground="teal.500"
              onClick={() =>
                router.push({
                  query: { ...router.query, tags: tag.id }
                })
              }
            >
              {`#${tag.title}`}
            </TagWithHover>
          ))}
        </HStack>

        <Heading
          as="h2"
          fontSize="4xl"
          mb={5}
          cursor="pointer"
          transition="ease-in-out .2s"
          _hover={{ color: 'primary.500' }}
        >
          <Link href={`/articles/${article.slug}`} passHref>
            <Box as="a" display="block">
              {article.title}
            </Box>
          </Link>
        </Heading>

        <HStack mb={3}>
          <TagWithHover colorScheme="purple" py="3">
            <TagLeftIcon boxSize="3" as={UserIcon} />
            <TagLabel>
              {CommonUtil.getFullName(article.author.firstName, article.author.lastName)}
            </TagLabel>
          </TagWithHover>

          <TagWithHover
            colorScheme="blue"
            hoverBackground="blue.500"
            py="3"
            onClick={() =>
              router.push({
                query: { ...router.query, category: article.category.id }
              })
            }
          >
            <TagLeftIcon boxSize="3" as={TagIcon}></TagLeftIcon>
            <TagLabel>{article.category.title}</TagLabel>
          </TagWithHover>

          <Tag colorScheme="gray" py="3" rounded="xl">
            <TagLeftIcon boxSize="3" as={CalendarIcon}></TagLeftIcon>
            <TagLabel>{format(new Date(article.createdAt), 'MMMM dd yyyy')}</TagLabel>
          </Tag>
        </HStack>

        <Text color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>{article.description}</Text>
      </Box>
    </Box>
  );
}
