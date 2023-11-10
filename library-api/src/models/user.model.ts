import { UserId } from '../entities';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  favoriteBook: string[];
  userBook: string[];
};

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  favoriteBook: string[];
  userBook: string[];
};
