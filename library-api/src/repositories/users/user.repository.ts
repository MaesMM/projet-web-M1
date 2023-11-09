import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { User, UserId } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/users/user.repository.type';
import {
  adaptUserEntityToUserModel,
  adaptUserEntityToPlainUserModel,
} from 'library-api/src/repositories/users/user.utils';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    const users = await this.find({
      relations: { userBook: { book: true } },
    });

    return users.map(adaptUserEntityToPlainUserModel);
  }

  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({
      where: { id },
      relations: { userBook: { book: true } },
    });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(user);
  }
}
