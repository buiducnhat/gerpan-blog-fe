import { IArticleCategoryBasic } from './article-category.model';
import { IArticleCommentBasic } from './article-comment.model';
import { IArticleTagBasic } from './article-tag.model';
import { IUserBasic } from './user.model';

export enum ArticleMetaKey {
  BANNER = 'Banner',
  KEYWORD = 'Keyword',
  HEADER = 'Header'
}

export interface IArticleMetaBasic {
  id: number;
  key: ArticleMetaKey;
  content: string;
}

export interface IArticleBasic {
  id: number;
  title: string;
  metaTitle: string;
  slug: string;
  description: string;
  content: string;
  published: boolean;
  author: IUserBasic;
  parent?: IArticleBasic | null;
  children?: IArticleBasic[];
  metas?: IArticleMetaBasic[];
  category: IArticleCategoryBasic;
  tags: IArticleTagBasic[];
  comments: IArticleCommentBasic[];
  createdAt: Date;
  updatedAt: Date;
}
