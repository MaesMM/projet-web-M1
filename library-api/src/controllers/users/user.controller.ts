import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserId } from 'library-api/src/entities';
import { UserUseCases } from '../../useCases/users/user.useCases.type';
import { PlainUserPresenter, UserPresenter } from './user.presenter';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

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
    isArray: true,
  })
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }
}