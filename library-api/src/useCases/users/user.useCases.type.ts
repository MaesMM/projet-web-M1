import { UserModel, PlainUserModel } from 'library-api/src/models';
import { CreateUserRepositoryInput, UpdateUserRepositoryInput } from 'library-api/src/repositories/users/user.repository.type';

export type PlainUserUseCasesOutput = PlainUserModel;
export type UserUseCasesOutput = UserModel;
export type CreateUserUseCasesInput = CreateUserRepositoryInput;
export type UpdateUserUseCasesInput = UpdateUserRepositoryInput;