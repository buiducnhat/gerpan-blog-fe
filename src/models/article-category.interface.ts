export enum ArticleCategoryLevel {
  LEVEL1 = 1,
  LEVEL2 = 2
}

export interface IArticleCategoryBasic {
  id: number;
  title: string;
  level: ArticleCategoryLevel;
}
