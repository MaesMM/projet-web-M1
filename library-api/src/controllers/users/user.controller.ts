import { Controller, Get, Param } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { UserUseCases } from '../../useCases/users/user.useCases.type';
import { PlainUserPresenter, UserPresenter } from './user.presenter';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllplain();

    return users.map(PlainUserPresenter.from);
  }

  @Get('/id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }
}
