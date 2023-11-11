import { Book, BookId, UserId } from '../entities';
import { BookModel, PlainBookModel, favoriteBookModel } from './book.model';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  favoriteBook: favoriteBookModel;
  userBook: BookId[];
};

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  favoriteBook: BookModel;
  userBook: BookModel[];
};
