import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { __userMock } from '@src/__mocks__/user.mock';
import { __articleMock } from '@src/__mocks__/articles.mock';
import { __articleTagsMock } from '@src/__mocks__/article-tags.mock';
import { CommonUtil } from '@src/utils/common.util';
import ArticleDetail from '@src/components/article/article-detail';
import { ArticleTableContent } from '@src/components/article/article-table-content';
import { TitleHeading } from '@src/components/title-heading';

export default function ArticlePage() {
  const router = useRouter();

  const articleSlug = router.query['article-slug'] as string;

  useEffect(() => {
    if (articleSlug) {
      const articleId = CommonUtil.getIdFromSlug(articleSlug);
    }
  }, [articleSlug]);

  return (
    <MainTemplate meta={<Meta title="Articles | Gerpan Blog" description="Gerpan Blog" />}>
      <CustomRow>
        <CustomColumn base={12} md={8}>
          {__articleMock && <ArticleDetail article={__articleMock} />}
        </CustomColumn>

        <CustomColumn base={12} md={4}>
          <TitleHeading title={'Table of contents'} />
          <ArticleTableContent />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}
