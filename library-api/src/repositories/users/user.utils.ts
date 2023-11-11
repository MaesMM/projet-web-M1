import { User, Book, BookId, Author, UserBook } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/users/user.repository.type';
import { adaptBookEntityToBookModel, adaptBookEntityToPlainBookModel } from '../books/book.utils';

export const adaptUserEntityToPlainUserModel = (
  user: User,
  ): PlainUserRepositoryOutput => { return ({
    ...user,
    favoriteBook: user.favoriteBook ? user.favoriteBook : null,
    userBook: (user.userBook ) ? user.userBook.map((userBook) => userBook.book ? userBook.book.id : null ) : [],
 
    // userBook: ( !user.userBook ) ?  [] : user.userBook.map((userBookk) => userBookk.book ? userBookk.book.id : null ),  
    // userBook: ['cae31258-1c9d-469f-b7e4-c35767667cfe'] as BookId[],  
});
};


export const adaptUserEntityToUserModel = (
  user: User,
): UserRepositoryOutput => { console.log('user.favoriteBook',user.favoriteBook); console.log('user.userbook',user.userBook); return ({
  ...user,
  favoriteBook: user.favoriteBook ? adaptBookEntityToBookModel(user.favoriteBook) : null,
  userBook: (!user.userBook) ? [] : user.userBook.map((userBook) => userBook.book ? adaptBookEntityToBookModel(userBook.book) : null),
 
})};