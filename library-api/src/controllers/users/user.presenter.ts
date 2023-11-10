import { ApiProperty } from '@nestjs/swagger';
import { PlainUserModel, UserModel } from 'library-api/src/models';
import { UserId } from 'library-api/src/entities';

export class PlainUserPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: UserId;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({
    description: 'List the favorite books of the user',
    type: [String],
  })
  favoriteBook: string[];

  @ApiProperty({
    description: 'List the books of the user',
    type: [String],
  })
  userBook: string[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      favoriteBook: data.favoriteBook,
      userBook: data.userBook,
    });
  }
}

export class UserPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({
    description: 'List the favorite books of the user',
    type: [String],
  })
  favoriteBook: string[];

  @ApiProperty({
    description: 'List the books of the user',
    type: [String],
  })
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