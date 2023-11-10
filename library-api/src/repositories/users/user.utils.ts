import { User } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/users/user.repository.type';

export const adaptUserEntityToPlainUserModel = (
  user: User,
): PlainUserRepositoryOutput => ({
  ...user,
  favoriteBook: user.userBook.map((userBook) => userBook.book.name),
  userBook: user.userBook.map((userBook) => userBook.book.name),
});

// export const adaptUserEntityToUserModel = (
//   user: User,
// ): UserRepositoryOutput => ({
//   ...user,
//   userBook: user.userBook.map((userBook) => userBook.book),
// });
