import { Box } from '@chakra-ui/layout';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { MainRightSideBar } from '@src/components/sidebar/main-right-sidebar';
import { ArticleCard } from '@src/components/article/article-card';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { ArticleTagsRandom } from '@src/components/article-tags/article-tags-random';
import { TitleHeading } from '@src/components/title-heading';
import { __userMock } from '@src/__mocks__/user.mock';
import { __articlesMock } from '@src/__mocks__/articles.mock';
import { __articleTagsMock } from '@src/__mocks__/article-tags.mock';

export default function ArticlesPage() {
  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          <TitleHeading title={'Articles'} />
          <Box mb="5" />

          <ArticleTagsRandom tags={__articleTagsMock} />
          <Box mb="5" />

          {__articlesMock?.length > 0 &&
            __articlesMock.map((__article) => <ArticleCard key={__article.id} article={__article} />)}
        </CustomColumn>
        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}
