import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserId } from 'library-api/src/entities';
import { PlainUserPresenter, UserPresenter } from './user.presenter';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { BookModel, PlainUserModel, UserModel } from 'library-api/src/models';
import { BookUseCases, UserUseCases } from 'library-api/src/useCases';
import { Update } from 'next/dist/build/swc';
import { adaptUserEntityToUserModel } from 'library-api/src/repositories/users/user.utils';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases,
    private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Get all users',
    type: PlainUserPresenter,
    isArray: true,
  })
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllplain();
    return users.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get user by id',
    type: UserPresenter,
    isArray: false,
  })
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }

  @Post('/')
   @ApiOkResponse({
    description: 'Create user',
    type: UserPresenter,
    isArray: false,
  })
  public async createUser(
    @Body() bodyContent : CreateUserDto,
  ): Promise<PlainUserPresenter>{
    const newUser : {firstName : string, lastName : string} = {
      firstName : bodyContent.firstName,
      lastName : bodyContent.lastName
    }

    const createdUser = await this.userUseCases.create(newUser);
    return PlainUserPresenter.from(createdUser);
  }

  @Patch('/:id')
  @ApiOkResponse({
    description: 'Update user',
    type: UserPresenter,
    isArray: false,
  })
  public async updateUser(
    @Param('id') id: UserId,
    @Body() bodyContent : UpdateUserDto,
    ) : Promise<UserPresenter>{
      const user = await this.userUseCases.getById(id);

      if (!user) {
        throw new Error(`User - '${id}' was not found`);
      }
      const book = bodyContent.favoriteBook ? await this.bookUseCases.getById(bodyContent.favoriteBook) : null;

      console.log("controller Book",book)
      console.log("controller",bodyContent.userBook)
      const userBookIds  = bodyContent.userBook ;
      // const userBooks =  bodyContent.userBook ? await Promise.all(userBookIds.map(id => this.bookUseCases.getById(id))) : [];
      const userBooks : BookModel [] = [];
      if (bodyContent.userBook) {
        for (const id of userBookIds) {
          const book = id ? await this.bookUseCases.getById(id) : null;
          userBooks.push(book);
        }
      }


       const body :UserModel = {
        id : id,
        firstName : bodyContent.firstName,
        lastName : bodyContent.lastName,
        favoriteBook : book,
        userBook : userBooks
      }
      console.log("flag")

    return UserPresenter.from(await this.userUseCases.update(id as UserId, body));
    }
  






    
  @Delete('/:id')
  public async deleteBook(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);
    if (user) {
      await this.userUseCases.delete(id);
    }
    return UserPresenter.from(user);
  }
  
}