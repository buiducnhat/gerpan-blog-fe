import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Box,
  Avatar,
  Image,
  Heading,
  HStack,
  VStack,
  Divider,
  Text,
  Button,
  useColorMode
} from '@chakra-ui/react';
import { FaCalendar as CalendarIcon, FaBookmark as CategoryIcon } from 'react-icons/fa';
import { format as formatDate } from 'date-fns';

import { Meta } from '@src/layouts/meta';
import { Main as MainTemplate } from '@src/templates/main';
import { MainRightSideBar } from '@src/components/sidebar/main-right-sidebar';
import { CustomRow, CustomColumn } from '@src/components/custom-grid';
import { __userMock } from '@src/__mocks__/user.mock';
import { __articleMock } from '@src/__mocks__/articles.mock';
import { __articleTagsMock } from '@src/__mocks__/article-tags.mock';
import { CommonUtil } from '@src/utils/common.util';
import { ArticleMetaKey } from '@src/models/article.interface';
import { ArticleDetail } from '@src/components/article/article-detail';

export default function ArticlePage() {
  const router = useRouter();
  const { colorMode } = useColorMode();

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
          <ArticleDetail article={__articleMock} />
        </CustomColumn>

        <CustomColumn base={12} md={4}>
          <MainRightSideBar user={__userMock} />
        </CustomColumn>
      </CustomRow>
    </MainTemplate>
  );
}
