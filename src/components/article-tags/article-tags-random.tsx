import { useRouter } from 'next/router';
import { Flex, Tag, Icon, HStack, Text } from '@chakra-ui/react';
import { ThemeTypings } from '@chakra-ui/styled-system';
import { FaTags as TagsIcon } from 'react-icons/fa';

import { IArticleTagBasic } from '@src/models/article-tag.model';

export interface IArticleTagsRandomProps {
  tags: IArticleTagBasic[];
  setFilter: Function;
}

export default function ArticleTagsRandom({ tags }: IArticleTagsRandomProps) {
  const router = useRouter();

  const colorSchemes: ThemeTypings['colorSchemes'][] = [
    'blue',
    'cyan',
    'facebook',
    'green',
    'linkedin',
    'messenger',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'telegram',
    'twitter',
    'whatsapp',
    'yellow'
  ];

  const getTagColor = (tagId: number) => {
    tagId--;
    return colorSchemes[tagId % colorSchemes.length];
  };

  return (
    <Flex wrap="wrap" justify="center" align="center">
      <HStack mr="3">
        <Text as="h3" fontWeight="semibold" color="GrayText">
          {'Tags'}
        </Text>
        <Icon as={TagsIcon} w="5" h="5" color="primary.500" />
      </HStack>

      {tags.map((tag) => (
        <Tag
          key={tag.id}
          onClick={() => router.push({ query: { ...router.query, tags: tag.id } })}
          p="2"
          m="0.5"
          rounded="xl"
          variant="solid"
          colorScheme={getTagColor(tag.id)}
          cursor="pointer"
          sx={{ _hover: { shadow: 'xl' } }}
        >
          {tag.title}
        </Tag>
      ))}
    </Flex>
  );
}
