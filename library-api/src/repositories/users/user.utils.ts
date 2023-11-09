import { User, Book } from 'library-api/src/entities';
import { BookModel } from 'library-api/src/models';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/users/user.repository.type';

const adaptBookToBookModel = (book: Book): BookModel => ({
  id: book.id,
  name: book.name,
  writtenOn: book.writtenOn,
  author: book.author,
  userBook: book.userBook,
  genres: [],
});

export const adaptUserEntityToPlainUserModel = (
  user: User,
): PlainUserRepositoryOutput => ({
  ...user,
  favoriteBook: user.userBook.map((userBook) => userBook.book.name),
  userBook: user.userBook.map((userBook) => userBook.book.name),
});

export const adaptUserEntityToUserModel = (
  user: User,
): UserRepositoryOutput => ({
  ...user,
  favoriteBook: adaptBookToBookModel(user.favoriteBook),
  userBook: user.userBook.map((userBook) => userBook.book.name),
});
