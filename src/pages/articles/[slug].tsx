import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Box } from '@chakra-ui/react';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { CommonUtil } from '@src/utils/common.util';
import ArticleDetail from '@src/components/article/article-detail';
import ArticleTableContent from '@src/components/article/article-table-content';
import ArticlesSameAuthor from '@src/components/article/article-same-author';
import { IArticleBasic } from '@src/models/article.model';
import { API_ENDPOINT } from '@src/configs';
import { callApi } from '@src/utils/api.util';

export default function ArticlePage({
  article,
  sameAuthorArticles
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          {article && <ArticleDetail article={article} />}
        </CustomColumn>

        <CustomColumn base={12} md={4} position="relative">
          <Box position="sticky" top="16">
            <ArticleTableContent />
            <ArticlesSameAuthor articles={sameAuthorArticles} />
          </Box>
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}

export interface IArticlePageProps {
  article: IArticleBasic;
  sameAuthorArticles: IArticleBasic[];
}

export const getServerSideProps: GetServerSideProps<IArticlePageProps> = async (context) => {
  const params = context.params;
  const { slug } = params as ParsedUrlQuery;
  const id = CommonUtil.getIdFromSlug(slug as string);
  const { token } = context.req.cookies;

  try {
    const article = (await callApi<IArticleBasic>({ url: `${API_ENDPOINT}/articles/${id}`, token }))
      .data;
    if (CommonUtil.makeSlug(article.title, id) !== slug) {
      throw Error();
    }
    const sameAuthorArticles = (
      await callApi<IArticleBasic[]>({ url: `${API_ENDPOINT}/articles/${id}/related`, token })
    ).data;

    return {
      props: {
        article,
        sameAuthorArticles
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
