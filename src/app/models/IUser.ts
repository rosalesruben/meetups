export enum USER_ROLE {
  ATTENDER = 'ATTENDER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  name: string;
  lastname: string;
  username: string;
  password: string;
  role: USER_ROLE;
  id?: string;
}
