import { ApiProperty } from '@nestjs/swagger';
import { AuthorId, Book } from 'library-api/src/entities';
import { PlainAuthorModel, AuthorModel } from 'library-api/src/models';

export class PlainAuthorPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: AuthorId;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}

export class AuthorPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  photoUrl?: string;

  @ApiProperty({
    description: 'List the books of the author',
    type: [String],
  })
  books: Book[];

  private constructor(data: AuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      books: data.books,
    });
  }
}
