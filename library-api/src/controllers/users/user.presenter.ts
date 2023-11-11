import { ApiProperty } from '@nestjs/swagger';
import { BookModel, PlainUserModel, UserModel, favoriteBookModel } from 'library-api/src/models';
import { Book, BookId, UserId } from 'library-api/src/entities';
import { PlainBookPresenter } from '../books/book.presenter';

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
  favoriteBook: favoriteBookModel;

  @ApiProperty({
    description: 'List the books of the user',
    type: [String],
  })
  userBook: BookId[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      favoriteBook: data.favoriteBook ? data.favoriteBook : null,
      userBook: data.userBook ? data.userBook : [],
    });
  }
}

export class UserPresenter {
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
  favoriteBook: BookModel;

  @ApiProperty({
    description: 'List the books of the user',
    type: [String],
  })
  userBook: BookModel[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      favoriteBook: data.favoriteBook ? data.favoriteBook : null,
      userBook: data.userBook ? data.userBook : [],      
    });
  }
}