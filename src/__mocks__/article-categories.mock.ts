import { IArticleCategoryBasic } from '@src/models/article-category.interface';

export const __articleCategoryMock: IArticleCategoryBasic = {
  id: 1,
  level: 1,
  title: 'Category'
};

export const __articleCategoriesMock = new Array<IArticleCategoryBasic>(10).fill(
  __articleCategoryMock
);
