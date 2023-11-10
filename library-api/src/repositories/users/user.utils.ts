import { User, Book } from 'library-api/src/entities';
import { BookModel } from 'library-api/src/models';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/users/user.repository.type';

export const adaptUserEntityToPlainUserModel = (
  user: User,
): PlainUserRepositoryOutput => ({
  ...user,
  favoriteBook: user.favoriteBook ? [user.favoriteBook.name] : [],
  userBook: user.userBook ? user.userBook.map((userBook) => userBook.book ? userBook.book.name : null) : [], 
});

// export const adaptUserEntityToUserModel = (
//   user: User,
// ): UserRepositoryOutput => ({
//   ...user,
//   userBook: user.userBook.map((userBook) => userBook.book),
// });
