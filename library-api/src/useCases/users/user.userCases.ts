import { Injectable } from '@nestjs/common';
import { Book, BookId, User, UserBook, UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories/users/user.repository';

import { CreateUserUseCasesInput, PlainUserUseCasesOutput, UpdateUserUseCasesInput, UserUseCasesOutput } from './user.useCases.type';
import { CreateUserRepositoryInput } from 'library-api/src/repositories/users/user.repository.type';
import { NotFoundError } from 'rxjs';
import { UserPresenter } from 'library-api/src/controllers/users/user.presenter';
import { BookModel, UserModel } from 'library-api/src/models';
import { adaptUserEntityToPlainUserModel } from 'library-api/src/repositories/users/user.utils';
import { BookRepository } from 'library-api/src/repositories';
import { pushBookModelToArray } from 'library-api/src/repositories/books/book.utils';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UserUseCases {
  constructor(private readonly userRepostitory: UserRepository,
    private readonly bookRepository : BookRepository) {}

  public async getAllplain(): Promise<PlainUserUseCasesOutput[]> {
    return this.userRepostitory.getAllPlain();
  }

  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    return this.userRepostitory.getById(id);
  }

  public async create(
    bodyContent: CreateUserUseCasesInput,
  ): Promise<PlainUserUseCasesOutput> {
    const userPresenter = await this.userRepostitory.createPlain(bodyContent);
    return {
      ...userPresenter,
      id: userPresenter.id as UserId,
    };
  }

  public async update(
      id: UserId,
      bodyContent: UpdateUserUseCasesInput,
    ): Promise <UserUseCasesOutput> {
      const user = await this.userRepostitory.getById(id);
      const userTypeUser = await this.userRepostitory.getByIdTypeUser(id);
      if (!user) {
        throw new NotFoundError(`User - '${id}'`);
      }

      const book = bodyContent.favoriteBook ? await this.bookRepository.getByIdTypeBook(bodyContent.favoriteBook.id) : null;
      

      for (const userBook of user.userBook) {
        await userBook ? this.bookRepository.delete(userBook.id): null;
      }

      // const userBooks = bodyContent.userBook.map(async (userBook) => {
      //     const book = await this.bookRepository.getById(userBook.id);
      //     return book.id;
      // });

      let userBooks : BookModel[] = [];
      for (const userBook of bodyContent.userBook) {
        console.log(userBook)
        const userbookModel = userBook ? await this.bookRepository.getById(userBook.id) : null ;
        userBooks = pushBookModelToArray(userBooks, userbookModel)
      }
      console.log(userBooks)
      
      
      let userBooksTypeUser : UserBook[] = [];  
      for (let userBook of bodyContent.userBook) {
        const userBook = new UserBook();
        userBook.user = userTypeUser;
        userBook.book = book;
        userBook.id = uuid4();
        userBook.save();
        userBooksTypeUser.push(userBook);
      }
      console.log("userBooksTypeUser",userBooksTypeUser)
           
      

      // const resolvedUserBooks = await Promise.all(userBooks);

      
      const userPresenter = await this.userRepostitory.updateUser(bodyContent, id, book, userBooksTypeUser);
      return userPresenter
    }


  public async delete(id: UserId): Promise<UserPresenter> {
    const user = await this.userRepostitory.getById(id);

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    try {
      await this.userRepostitory.deleteUser(id);
    } catch (error) {
      throw new Error(`User - '${id}' was not deleted`);
    }

    return UserPresenter.from(user);
  }

}