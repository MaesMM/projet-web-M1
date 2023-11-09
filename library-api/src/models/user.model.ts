import { UserId } from '../entities';
import { BookModel } from './book.model';

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
  favoriteBook: BookModel;
  userBook: string[];
};
