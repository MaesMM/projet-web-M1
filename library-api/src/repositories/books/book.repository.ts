import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, Book, BookId } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  CreateBookRepositoryInput,
  UpdateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// import { BadRequestError } from '@nestjs/common';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Get a book by its name
   * @param id Book's name
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */

  public async getByName(
    name: string,
  ): Promise<void> /*Promise<BookRepositoryOutput>*/ {
    const book = await this.findOne({
      where: { name },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${name}'`);
    }

    //return adaptBookEntityToBookModel(book);
  }

  /**
   * Create a new book
   * @param book
   * @throws 500: book was not created
   * @throws 404: author or genre with this ID was not found
   * @returns
   */
  public async createBook(
    inputbook: CreateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    const book = new Book();
    book.name = inputbook.name;
    book.author = new Author();
    book.id = uuidv4();
    await book.save();

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Update a book
   * @param book Book's data
   * @returns Updated book
   * @throws 500: book was not updated
   * @throws 404: book with this ID was not found
   */
  public async updateBook(
    inputbook: UpdateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    return this.save(inputbook);
  }

  public async deleteBook(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.getById(id);

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    try {
      await this.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(`Book - '${id}'`);
    }

    return book;
  }
}
