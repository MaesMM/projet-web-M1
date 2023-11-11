import { UserModel, PlainUserModel } from 'library-api/src/models/user.model';

export type PlainUserRepositoryOutput = PlainUserModel;
export type UserRepositoryOutput = UserModel;
export type CreateUserRepositoryInput = {firstName : string, lastName : string};
export type UpdateUserRepositoryInput = UserModel;