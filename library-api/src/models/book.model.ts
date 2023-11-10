import { Author, BookId, UserBook } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models/author.model';
import { GenreModel } from 'library-api/src/models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: string[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  userBook: UserBook[];
  genres: GenreModel[];
};

export type SBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  userBook: UserBook[];
};
