import { Container, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { MainLeftSideBar } from '@src/components/sidebar/main-left-sidebar';
import { Article } from '@src/components/article';
import { __articlesMock } from '@src/__mocks__/articles.mock';
import { __userMock } from '@src/__mocks__/user.mock';

export default function Home() {
  const grid = useBreakpointValue({ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' });

  return (
    <MainTemplate meta={<Meta title="Home | Gerpan Blog" description="Gerpan Blog" />}>
      <Grid templateColumns={grid} gap={4}>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={{ sm: 1, lg: 2 }}>
          {__articlesMock?.length > 0 &&
            __articlesMock.map((__article) => <Article key={__article.id} article={__article} />)}
        </GridItem>
        <GridItem colSpan={1}>
          <MainLeftSideBar user={__userMock} />
        </GridItem>
      </Grid>
    </MainTemplate>
  );
}
