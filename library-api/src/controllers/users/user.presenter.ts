import { PlainUserModel, UserModel } from 'library-api/src/models';
import { UserId } from 'library-api/src/entities';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  favoriteBook: string[];

  userBook: string[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

//   public static from(data: PlainUserModel): PlainUserPresenter {
//     return new PlainUserPresenter({
//       id: data.id,
//       firstName: data.firstName,
//       lastName: data.lastName,
//       favoriteBook: PlainBookPresenter.from(data.favoriteBook),
//       userBook: data.userBook,
//     });
//   }
}

export class UserPresenter {
  id: string;

  firstName: string;

  lastName: string;

  favoriteBook: string[];

  userBook: string[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      favoriteBook: data.favoriteBook,
      userBook: data.userBook,
    });
  }
}
