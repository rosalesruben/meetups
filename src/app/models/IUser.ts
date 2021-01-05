export enum USER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  name: string;
  lastname: string;
  username: string;
  password: string;
  role: USER_ROLE;
  _id?: string;
}
