export interface IUser {
  userId?: number;
  email: string;
  displayName?: string;
  token?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  phoneNumber?: string;
  photoUrl?: string;
  roles?: Array<string>;
}

