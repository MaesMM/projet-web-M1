import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { v4 as uuid4 } from 'uuid';
import { Book, BookGenre, BookId, GenreId } from 'library-api/src/entities';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
} from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  CreateBookUseCasesInput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';
import {
  BookModel,
  GenreModel,
  PlainAuthorModel,
  PlainBookModel,
} from 'library-api/src/models';
import { PlainAuthorRepositoryOutput } from 'library-api/src/repositories/authors/author.repository.type';
import { PlainBookRepositoryOutput } from 'library-api/src/repositories/books/book.repository.type';
import { CreateBookDto } from 'library-api/src/controllers/books/create-book.dto';
import { convertBookModelToPlainBookModel } from 'library-api/src/useCases/books/book.useCases.type';
import { PlainGenreModel } from 'library-api/src/repositories/genres/genre.utils';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly genreRepository: GenreRepository,
  ) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<BookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a new book
   * @param  bodyContent Book's data
   * @returns Created book
   * @throws 500: book was not created
   * @throws 404: author or genre with this ID was not found
   */

  public async create(
    bodyContent: CreateBookUseCasesInput,
  ): Promise<BookUseCasesOutput> {
    return this.bookRepository.createBook(bodyContent);
  }

  /**
   * Update a book by its ID
   * @param id Book's ID
   * @param inputBook Book's data
   * @returns Updated book
   * @throws 404: book with this ID was not found
   * @throws 500: book with this ID was not updated
   */
  public async updateBook(
    id: BookId,
    updateBook: {
      name: string;
      writtenOn: Date;
      author: PlainAuthorModel;
      genres: GenreId[];
    },
  ): Promise<BookUseCasesOutput> {
    const bookToUpdate = await this.bookRepository.getById(id);
    const inputBook = updateBook;

    if (!bookToUpdate) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    bookToUpdate.name = inputBook.name;
    bookToUpdate.writtenOn = inputBook.writtenOn;

    const author = await this.authorRepository.getByIdTypeAuthor(
      inputBook.author.id,
    );
    if (!author) {
      throw new NotFoundError(`Author - '${inputBook.author.id}'`);
    }
    bookToUpdate.author = author;

    const genreIds: GenreId[] = inputBook.genres;

    const genres: GenreModel[] = await Promise.all(
      genreIds.map(async (genreId) => {
        const genreToAdd = await this.genreRepository.getById(genreId);

        if (!genreToAdd) {
          throw new NotFoundError(`Genre - '${genreId}'`);
        }
        return genreToAdd;
      }),
    );
    console.log(genres);

    const book = await this.bookRepository.getByIdTypeBook(id);

    for (let i = 0; i < genres.length; i++) {
      const bookGenre = new BookGenre();
      bookGenre.id = uuid4();
      bookGenre.book = book;
      const genre = await this.genreRepository.getByIdTypeGenre(genres[i].id);
      bookGenre.genre = genre;
      bookGenre.save();
      console.log('bookGenre', bookGenre);
    }

    return await this.bookRepository.updateBook(bookToUpdate);
  }

  /**
   * Delete a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   * @throws 500: book with this ID was not deleted
   */

  public async deleteBook(id: BookId): Promise<BookUseCasesOutput> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    try {
      await this.bookRepository.delete(id);
    } catch (error) {
      throw new Error(`Book - '${id}' was not deleted`);
    }

    return book;
  }
}
