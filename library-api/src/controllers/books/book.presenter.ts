import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
// import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { ApiProperty } from '@nestjs/swagger';
import { BookId, UserBook } from 'library-api/src/entities';
import { BookModel, PlainBookModel, SBookModel } from 'library-api/src/models';

export class PlainBookPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: BookId;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Date })
  writtenOn: Date;

  @ApiProperty({
    description: 'The author of the book',
    type: [String],
  })
  author: PlainAuthorPresenter;

  @ApiProperty({
    description: 'List the genres of the book',
    type: [String],
  })
  genres: string[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
    });
  }
}

export class BookPresenter {
  @ApiProperty({ type: String, format: 'uuid' })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: PlainAuthorPresenter })
  author: PlainAuthorPresenter;

  @ApiProperty({ type: Date })
  writtenOn: Date;

  @ApiProperty({
    description: 'List the genres of the book',
    type: [String],
  })
  genres: string[];

  @ApiProperty({
    description: 'List the users who have the book',
    type: [String],
  })
  UserBook: UserBook[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
      genres: data.genres.map((genre) => genre.name),
      UserBook: data.userBook,
    });
  }
}

export class SBookPresenter {
  id: string;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  private constructor(data: SBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: SBookModel): SBookPresenter {
    return new SBookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
    });
  }
}
