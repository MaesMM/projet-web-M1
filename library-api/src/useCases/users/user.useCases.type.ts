import { Injectable } from '@nestjs/common';
import { UserId } from 'library-api/src/entities';
import { UserRepository } from 'library-api/src/repositories/users/user.repository';
import { PlainUserUseCasesOutput, UserUseCasesOutput } from './user.userCases';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepostitory: UserRepository) {}

  public async getAllplain(): Promise<PlainUserUseCasesOutput[]> {
    return this.userRepostitory.getAllPlain();
  }

//   public async getById(id: UserId): Promise<UserUseCasesOutput> {
//     return this.userRepostitory.getById(id);
//   }
}
