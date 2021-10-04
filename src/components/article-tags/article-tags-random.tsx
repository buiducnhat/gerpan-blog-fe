import { Flex, Tag } from '@chakra-ui/react';
import { ThemeTypings } from '@chakra-ui/styled-system';
import { IArticleTagBasic } from '@src/models/article-tag.interface';

export interface IArticleTagsRandomProps {
  tags: IArticleTagBasic[];
}

export const ArticleTagsRandom = ({ tags }: IArticleTagsRandomProps) => {
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
    <Flex wrap="wrap" justify="center">
      {tags.map((tag) => (
        <Tag key={tag.id} p='2' m='0.5' variant="solid" colorScheme={getTagColor(tag.id)}>
          {tag.title}
        </Tag>
      ))}
    </Flex>
  );
};
