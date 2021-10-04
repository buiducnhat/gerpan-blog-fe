import { IArticleTagBasic } from '@src/models/article-tag.interface';
import { CommonUtil } from '@src/utils/common.util';

export const __articleTagMock: IArticleTagBasic = {
  id: 1,
  title: 'Tag'
};

const __articleTagsMock: IArticleTagBasic[] = [];
for (let i = 0; i < 15; i++) {
  __articleTagsMock.push({
    id: i + 1,
    title: CommonUtil.getRandomString()
  });
}

export { __articleTagsMock };
