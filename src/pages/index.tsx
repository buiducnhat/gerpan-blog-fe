import { Box } from '@chakra-ui/layout';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import MainRightSideBar from '@src/components/sidebar/main-right-sidebar';
import ArticleCard from '@src/components/article/article-card';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import ArticleTagsRandom from '@src/components/article-tags/article-tags-random';
import TitleHeading from '@src/components/title-heading';
import { __userMock } from '@src/__mocks__/user.mock';
import { IArticleBasic } from '@src/models/article.model';
import { CommonUtil } from '@src/utils/common.util';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { IArticleTagBasic } from '@src/models/article-tag.model';
import { IArticleCategoryBasic } from '@src/models/article-category.model';

export default function HomePage({
  articles,
  articleCategories,
  articleTags
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainTemplate meta={<Meta title="Home | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          <TitleHeading title={'Articles'} />
          <Box mb="5" />

          <ArticleTagsRandom tags={articleTags} />
          <Box mb="5" />

          {articles?.length > 0 &&
            articles.map((__article) => <ArticleCard key={__article.id} article={__article} />)}
        </CustomColumn>
        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} articleCategories={articleCategories} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}

interface IHomePageProp {
  articles: IArticleBasic[];
  articleTags: IArticleTagBasic[];
  articleCategories: IArticleCategoryBasic[];
}

export const getStaticProps: GetStaticProps<IHomePageProp> = async (context) => {
  const articlesResponse = await fetch('https://gerpan.xyz/api/articles');
  const articleTagsResponse = await fetch('https://gerpan.xyz/api/articles/tags');
  const articleCategoriesponse = await fetch('https://gerpan.xyz/api/articles/categories');

  const articlesResult = await articlesResponse.json();
  const articleTags: IArticleTagBasic[] = await articleTagsResponse.json();
  const articleCategories: IArticleCategoryBasic[] = await articleCategoriesponse.json();

  const articles: IArticleBasic[] = articlesResult.items;
  return {
    props: {
      articles: articles.map((item) => ({
        ...item,
        slug: CommonUtil.makeSlug(item.title, item.id + '')
      })),
      articleTags,
      articleCategories
    }
  };
};
