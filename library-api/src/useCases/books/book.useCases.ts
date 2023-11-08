import { Injectable } from '@nestjs/common';
import { NotFoundError  } from 'library-api/src/common/errors';
import { Book, BookGenre, BookId} from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  CreateBookUseCasesInput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';
import { PlainBookModel } from 'library-api/src/models';
import { PlainAuthorRepositoryOutput } from 'library-api/src/repositories/authors/author.repository.type';
import { PlainBookRepositoryOutput } from 'library-api/src/repositories/books/book.repository.type';
import { CreateBookDto } from 'library-api/src/controllers/books/create-book.dto';

  


@Injectable()
export class BookUseCases {
  authorRepository: any;
  genreRepository: any;
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
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

  public async create(bodyContent: CreateBookUseCasesInput): Promise<BookUseCasesOutput> {
    return await this.bookRepository.createBook(bodyContent);
  }


  /**
   * Update a book by its ID
   * @param id Book's ID
   * @param book Book's data
   * @returns Updated book
   * @throws 404: book with this ID was not found
   * @throws 500: book with this ID was not updated
   */
  public async updateBook(
    id: BookId,
    book: CreateBookUseCasesInput,
  ): Promise<BookUseCasesOutput> {
    const bookToUpdate = await this.bookRepository.getById(id);

    if (!bookToUpdate) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    try {
      await this.bookRepository.update(id, book);
    } catch (error) {
      throw new Error(`Book - '${id}' was not updated`);
    }

    return this.bookRepository.getById(id);
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
