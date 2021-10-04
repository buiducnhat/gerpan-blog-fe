import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { MainRightSideBar } from '@src/components/sidebar/main-right-sidebar';
import { Article } from '@src/components/article';
import { __articlesMock } from '@src/__mocks__/articles.mock';
import { __userMock } from '@src/__mocks__/user.mock';
import { CustomGrid, CustomColumn } from '@src/components/custom-grid';

export default function Home() {
  return (
    <MainTemplate meta={<Meta title="Home | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomGrid>
        <CustomColumn base={12} md={8}>
          {__articlesMock?.length > 0 &&
            __articlesMock.map((__article) => <Article key={__article.id} article={__article} />)}
        </CustomColumn>
        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} />
        </CustomColumn>
      </CustomGrid>
    </MainTemplate>
  );
}
