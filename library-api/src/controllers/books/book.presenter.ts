import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import {
  BookModel,
  GenreModel,
  PlainBookModel,
  SBookModel,
} from 'library-api/src/models';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  writtenOn: Date;

  author: PlainAuthorPresenter;

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

  public static toPlain(data: BookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
      genres: data.genres.map((genre) => genre.name),
    });
  }
}

export class BookPresenter {
  id: string;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  genres: GenreModel[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
      genres: data.genres.map((genre) => genre),
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
