import { IUserBasic } from './user.model';

export interface IArticleCommentBasic {
  id: number;
  content: string;
  user: IUserBasic;
  createdAt: Date;
  updatedAt: Date;
}
