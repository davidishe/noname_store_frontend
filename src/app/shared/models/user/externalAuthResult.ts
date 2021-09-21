import { IUser } from './user';


export interface ExternalAuthResult {
  errors: string[];
  token: string;
  success: boolean;
  user: IUser;
}
