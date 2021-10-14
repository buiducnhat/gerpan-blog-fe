import Link from 'next/link';
import { Box, VStack, List, ListItem } from '@chakra-ui/react';

import { IArticleCategoryBasic } from '@src/models/article-category.interface';
import TitleHeading from '@src/components/title-heading';

export interface IArticleCategoryList {
  categories: IArticleCategoryBasic[];
}

export default function ArticleCategoryList({ categories }: IArticleCategoryList) {
  return (
    <Box>
      <VStack>
        <TitleHeading title={'Categories'} />

        <List spacing={3}>
          {categories.map((category) => (
            <ListItem key={category.id}>
              <Link href="#" passHref>
                <Box
                  as="a"
                  fontWeight="bold"
                  letterSpacing="tight"
                  textTransform="uppercase"
                  _hover={{ color: 'primary.500' }}
                >
                  {category.title}
                </Box>
              </Link>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}
