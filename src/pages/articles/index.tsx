import { Box } from '@chakra-ui/layout';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import MainRightSideBar from '@src/components/sidebar/main-right-sidebar';
import ArticleCard from '@src/components/article/article-card';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import ArticleTagsRandom from '@src/components/article-tags/article-tags-random';
import TitleHeading from '@src/components/title-heading';
import { __userMock } from '@src/__mocks__/user.mock';
import { __articlesMock } from '@src/__mocks__/articles.mock';
import { __articleTagsMock } from '@src/__mocks__/article-tags.mock';
import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

export default function ArticlesPage({ articles }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          <TitleHeading title={'Articles'} />
          <Box mb="5" />

          <ArticleTagsRandom tags={__articleTagsMock} />
          <Box mb="5" />

          {articles?.length > 0 &&
            articles.map((__article) => <ArticleCard key={__article.id} article={__article} />)}
        </CustomColumn>
        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}

interface IArticlesPageProp {
  articles: IArticleBasic[];
}

export const getStaticProps: GetStaticProps<IArticlesPageProp> = async (context) => {
  const response = await fetch('https://gerpan.xyz/api/articles');
  const result = await response.json();

  const articles: IArticleBasic[] = result.items;
  return {
    props: {
      articles: articles.map((item) => ({
        ...item,
        slug: CommonUtil.makeSlug(item.title, item.id + '')
      }))
    }
  };
};
