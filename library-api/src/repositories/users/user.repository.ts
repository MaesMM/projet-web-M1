import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { BookModel, PlainUserModel, UserModel } from 'library-api/src/models';
import { Book, User, UserBook, UserId } from 'library-api/src/entities';
import { v4 as uuid} from 'uuid'
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
  CreateUserRepositoryInput,
  UpdateUserRepositoryInput,
} from 'library-api/src/repositories/users/user.repository.type';
import {
  adaptUserEntityToUserModel,
  adaptUserEntityToPlainUserModel,
} from 'library-api/src/repositories/users/user.utils';
import { Repository, DataSource } from 'typeorm';
import { UserPresenter } from 'library-api/src/controllers/users/user.presenter';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    const users = await this.find({ relations: ['favoriteBook', 'userBook', 'userBook.book']});
    console.log("flag")
    console.log(users)
    
    return users.map(adaptUserEntityToPlainUserModel);
  }

  public async getById(id: UserId): Promise<UserRepositoryOutput> {
  const user = await this.findOne({
    where: { id },
    relations: ['userBook', 'favoriteBook', 'userBook.book'],
  });


  if (!user) {
    throw new NotFoundError(`User - '${id}'`);
  }

  return adaptUserEntityToUserModel(user);
  
  }

  public async getByIdTypeUser(id: UserId): Promise<User> {
  const user = await this.findOne({
    where: { id },
    relations: { userBook: true },
  });
  return user
  }

  public async createPlain(bodyContent : CreateUserRepositoryInput) : Promise<PlainUserModel>{
    const user = new User() as User;
    user.id = uuid();
    user.firstName = bodyContent.firstName;
    user.lastName = bodyContent.lastName;
    await this.save(user);
    return adaptUserEntityToPlainUserModel(user);
  }



  public async updateUser(bodyContent: UpdateUserRepositoryInput, id: UserId, book :Book,userBook :UserBook[]): Promise<UserRepositoryOutput> {
    const updatedUser : User = new User();
    updatedUser.id = id;
    updatedUser.firstName = bodyContent.firstName;
    updatedUser.lastName = bodyContent.lastName;
    updatedUser.favoriteBook = book ;
    updatedUser.userBook = userBook? userBook : [];
    
    console.log('updatedUser',updatedUser)
    await this.save(updatedUser);
    return adaptUserEntityToUserModel(updatedUser);
  }

  // public async createUserBook(userBook : UserBook[]) : Promise<UserBook[]>{
  //   const userBooks : UserBook[] = [];
  //   for (const userBook of userBooks) {
  //     const newUserBook = new UserBook();
  //     newUserBook.user = userBook.user;
  //     newUserBook.book = userBook.book;
  //     userBooks.push(newUserBook);
  //   }
  //   return userBooks;
  // }


  public async deleteUser(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.getByIdTypeUser(id);
    if (!user) {
      throw new NotFoundError(`Author - '${id}'`);
    }
    await this.remove(user);
    return adaptUserEntityToUserModel(user);
  }

}