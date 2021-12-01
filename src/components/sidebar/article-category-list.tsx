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
    <Box pb="5">
      <VStack>
        <TitleHeading title={'Categories'} />

        <List spacing={3}>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              onClick={() => router.push({ query: { ...router.query, category: category.id } })}
            >
              <Box
                as="h3"
                rounded="xl"
                fontWeight="bold"
                letterSpacing="tight"
                textTransform="uppercase"
                textAlign="center"
                cursor="pointer"
                _hover={{
                  transition: 'ease-in 0.15s',
                  py: '1',
                  px: '5',
                  background: 'purple.500',
                  color: 'white',
                  fontSize: '1.2rem',
                  letterSpacing: 'widest'
                }}
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
