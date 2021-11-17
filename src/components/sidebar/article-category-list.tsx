import { useRouter } from 'next/router';
import { Box, VStack, List, ListItem } from '@chakra-ui/react';

import { IArticleCategoryBasic } from '@src/models/article-category.model';
import TitleHeading from '@src/components/title-heading';

export interface IArticleCategoryList {
  categories: IArticleCategoryBasic[];
}

export default function ArticleCategoryList({ categories }: IArticleCategoryList) {
  const router = useRouter();

  return (
    <Box>
      <VStack>
        <TitleHeading title={'Categories'} />

        <List spacing={3}>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => router.push({ query: { category: category.id } })}
            >
              <Box
                as="a"
                fontWeight="bold"
                letterSpacing="tight"
                textTransform="uppercase"
                _hover={{ color: 'primary.500' }}
              >
                {category.title}
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}
