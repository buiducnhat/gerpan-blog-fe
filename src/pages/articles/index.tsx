import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Box, Heading } from '@chakra-ui/react';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import MainRightSideBar from '@src/components/sidebar/main-right-sidebar';
import ArticleCard from '@src/components/article/article-card';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import ArticleTagsRandom from '@src/components/article-tags/article-tags-random';
import TitleHeading from '@src/components/title-heading';
import Paginator from '@src/components/paginator';
import ArticleNoData from '@src/components/article/article-no-data';
import { IArticleBasic, IPaginatiedArticles } from '@src/models/article.model';
import { IArticleTagBasic } from '@src/models/article-tag.model';
import { IArticleCategoryBasic } from '@src/models/article-category.model';
import { API_ENDPOINT, PUBLIC_API_ENDPOINT } from '@src/configs';
import { IUserBasic } from '@src/models/user.model';
import { DEFAULT_ARTICLE_LIMIT } from '@src/configs/constants';
import { callApi } from '@src/utils/api.util';
import { getToken } from '@src/utils/token.util';

export default function ArticlesPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { articleTags, articleCategories } = props;
  const [filter, setFilter] = useState<IFilter>(router.query as IFilter);
  const [paginatedArticles, setPaginatedArticles] = useState<IPaginatiedArticles>(
    props.paginatedArticles
  );

  useEffect(() => {
    setFilter(router.query);
  }, [router.query]);

  useEffect(() => {
    callApi<IPaginatiedArticles>({
      url: `${PUBLIC_API_ENDPOINT}/articles`,
      params: { limit: DEFAULT_ARTICLE_LIMIT, ...filter },
      token: getToken()
    }).then((res) => setPaginatedArticles(res.data));
  }, [filter]);

  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <Heading as="h1" hidden={true}>
        {'Article'}
      </Heading>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          <TitleHeading title={'Articles'} />
          <Box mb="5" />

          <ArticleTagsRandom tags={articleTags} setFilter={setFilter} />
          <Box mb="5" />

          {paginatedArticles.items?.length > 0 ? (
            <>
              {paginatedArticles.items.map((__article: IArticleBasic) => (
                <ArticleCard key={__article.id} article={__article} />
              ))}
              <Paginator
                page={paginatedArticles.meta.currentPage}
                limit={paginatedArticles.meta.itemsPerPage}
                total={paginatedArticles.meta.totalItems}
                totalPages={paginatedArticles.meta.totalPages}
              />
            </>
          ) : (
            <ArticleNoData />
          )}
        </CustomColumn>
        <CustomColumn base={12} md={4} position="relative">
          <MainRightSideBar user={props.adminProfile} articleCategories={articleCategories} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}

interface IFilter {
  page?: number | string;
  limit?: number | string;
  category?: number | string;
  tags?: number | string;
  search?: string;
}

interface IArticlesPageProps {
  adminProfile: IUserBasic;
  paginatedArticles: IPaginatiedArticles;
  articleTags: IArticleTagBasic[];
  articleCategories: IArticleCategoryBasic[];
}

export const getServerSideProps: GetServerSideProps<IArticlesPageProps> = async (context) => {
  const { query } = context;
  const { token } = context.req.cookies;

  const adminProfile = (await callApi<IUserBasic>({ url: `${API_ENDPOINT}/users/admin` })).data;
  const paginatedArticles = (
    await callApi<IPaginatiedArticles>({
      url: `${API_ENDPOINT}/articles`,
      params: { limit: DEFAULT_ARTICLE_LIMIT, ...query },
      token
    })
  ).data;
  const articleTags = (await callApi<IArticleBasic[]>({ url: `${API_ENDPOINT}/articles/tags` }))
    .data;
  const articleCategories = (
    await callApi<IArticleCategoryBasic[]>({ url: `${API_ENDPOINT}/articles/categories` })
  ).data;

  return {
    props: {
      adminProfile,
      paginatedArticles,
      articleCategories,
      articleTags
    }
  };
};
