import { IArticleCategoryBasic } from '@src/models/article-category.model';
import { CommonUtil } from '@src/utils/common.util';

export const __articleCategoryMock: IArticleCategoryBasic = {
  id: 1,
  level: 1,
  title: 'Category'
};

const __articleCategoriesMock: IArticleCategoryBasic[] = [];
for (let i = 0; i < 5; i++) {
  __articleCategoriesMock.push({
    id: i + 1,
    title: CommonUtil.getRandomString(),
    level: 1
  });
}

export { __articleCategoriesMock };
