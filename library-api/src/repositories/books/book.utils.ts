import { Author, Book, BookGenre, BookGenreId, Genre, GenreId } from 'library-api/src/entities';
import { BookModel } from 'library-api/src/models';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import { adaptGenreEntityToGenreModel } from '../genres/genre.utils';

export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput =>{  return ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre.name),
})};


export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => {
  if (!book.bookGenres) {
    return {
      ...book,
      genres: [],
    };
  }

  return {
    ...book,
    genres: book.bookGenres.map((bookGenre) =>
      adaptGenreEntityToGenreModel(bookGenre.genre),
    ),
  };
};

export const adaptPlainBookModelToBookEntity = (
  plainBookModel: PlainBookRepositoryOutput,
): Book => {
  const book = new Book();
  book.id = plainBookModel.id;
  book.name = plainBookModel.name;
  book.writtenOn = plainBookModel.writtenOn;

  const author = new Author();
  author.id = plainBookModel.author.id;
  book.author = author;

  book.bookGenres = plainBookModel.genres.map((genreName) => {
    const genre = new Genre();
    genre.name = genreName;

    const bookGenre = new BookGenre();
    bookGenre.book = book;
    bookGenre.genre = genre;

    return bookGenre;
  });

  return book;
};

export const adaptBookToRepositoryOutput = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre),
});



export function convertToGenreId(idString: string): GenreId {
  const isUuid = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(idString);

  if (!isUuid) {
    throw new Error('Invalid GenreId format');
  }

  return idString as GenreId;
}


export function pushBookModelToArray(books: BookModel[], newBook: BookModel): BookModel[] {
  return [...books, { ...newBook }];
}