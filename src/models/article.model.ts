import { IArticleCategoryBasic } from './article-category.model';
import { IArticleCommentBasic } from './article-comment.model';
import { IArticleTagBasic } from './article-tag.model';
import { IUserBasic } from './user.model';

export interface IArticleBasic {
  id: number;
  title: string;
  slug?: string;
  description: string;
  banner: string;
  content: string;
  published: boolean;
  author: IUserBasic;
  category: IArticleCategoryBasic;
  tags: IArticleTagBasic[];
  comments: IArticleCommentBasic[];
  createdAt: Date;
  updatedAt: Date;
}
