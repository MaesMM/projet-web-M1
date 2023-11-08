import { Author, Book, BookGenre, Genre } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';

export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre.name),
});

export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre),
});

export const adaptPlainBookModelToBookEntity = (
  plainBookModel: PlainBookRepositoryOutput,
  ):  Book => {
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

export const adaptBookToRepositoryOutput = (book: Book): BookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre),
});