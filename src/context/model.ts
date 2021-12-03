import { IUserBasic } from '@src/models/user.model';

export interface IAppContext {
  user: IUserBasic | null;
}
