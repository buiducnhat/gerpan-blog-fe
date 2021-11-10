export enum ArticleCategoryLevel {
  LEVEL1 = 1,
  LEVEL2 = 2
}

export interface IArticleCategoryBasic {
  id: number;
  title: string;
  content?: string;
  level: ArticleCategoryLevel;
}

export interface IArticleCategoryDetail extends IArticleCategoryBasic {
  parent?: IArticleCategoryBasic;
  children?: IArticleCategoryBasic[];
}
