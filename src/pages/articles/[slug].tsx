import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Box } from '@chakra-ui/react';
import { ParsedUrlQuery } from 'querystring';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { CommonUtil } from '@src/utils/common.util';
import ArticleDetail from '@src/components/article/article-detail';
import ArticleTableContent from '@src/components/article/article-table-content';
import ArticleSameAuthor from '@src/components/article/article-same-author';
import { IArticleBasic } from '@src/models/article.model';

export default function ArticlePage({ article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          {article && <ArticleDetail article={article} />}
        </CustomColumn>

        <CustomColumn base={12} md={4} position="relative">
          <Box position="sticky" top="16">
            <ArticleTableContent />
            <ArticleSameAuthor />
          </Box>
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}

export interface IArticlePageProps {
  article: IArticleBasic;
}

export interface IArticlePagePathProps extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IArticlePagePathProps> = async () => {
  const response = await fetch('https://gerpan.xyz/api/articles');
  const result = await response.json();
  const articles: IArticleBasic[] = result.items;

  const paths = articles.map((article) => ({
    params: { slug: CommonUtil.makeSlug(article.title, article.id + '') }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IArticlePageProps> = async (context) => {
  const { slug } = context.params as IArticlePagePathProps;
  const id = CommonUtil.getIdFromSlug(slug);
  const response = await fetch(`https://gerpan.xyz/api/articles/${id}`);
  const article = await response.json();

  return { props: { article } };
};
