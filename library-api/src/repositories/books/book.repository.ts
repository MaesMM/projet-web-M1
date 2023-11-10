import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  Author,
  Book,
  BookGenre,
  BookId,
  Genre,
  GenreId,
} from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  CreateBookRepositoryInput,
  UpdateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
  adaptBookToRepositoryOutput,
  adaptPlainBookModelToBookEntity,
  convertToGenreId,
} from 'library-api/src/repositories/books/book.utils';
import { single } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<BookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map((book) => adaptBookEntityToBookModel(book));
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

  public async getByIdTypeBook(id: BookId): Promise<Book> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });
    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return book;
  }

  public async getByIdTypeBookGenre(id: BookId): Promise<BookGenre[]> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });
    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return book.bookGenres;
  }
  

  /**
   * Create a new book
   * @param book
   * @throws 500: book was not created
   * @throws 404: author or genre with this ID was not found
   * @returns
   */
  public async createBook(
    inputBook: CreateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    // gestion d'erreur si le livre existe déjà
    const existingBook = await this.findOne({
      where: { name: inputBook.name, author: inputBook.author },
      relations: { bookGenres: { genre: true }, author: true },
    });
    if (existingBook !== null) {
      throw new BadRequestException(
        `Book with name '${inputBook.name}' and author '${inputBook.author.lastName}' already exists`,
      );
    }
    const { name, writtenOn, author, genres } = inputBook;

    const existingAuthor = await this.dataSource
      .createEntityManager()
      .findOne(Author, { where: { id: author.id } });

    if (!existingAuthor) {
      throw new NotFoundError(`Author - '${author.id}'`);
    }

    const genreList: Genre[] = [];

    await Promise.all(
      genres.map(async (singleGenre) => {
        const existingGenre = await this.dataSource
          .createEntityManager()
          .findOne(Genre, { where: { id: singleGenre as GenreId } });

        genreList.push(existingGenre);

        if (!existingGenre) {
          throw new NotFoundError(`Genre - '${singleGenre}'`);
        }
      }),
    );

    const newBook = new Book();
    newBook.id = uuidv4();
    newBook.name = name;
    newBook.writtenOn = writtenOn;
    newBook.author = existingAuthor;

    const existingGenre = genreList.map((genre) => {
      const bookGenre = new BookGenre();
      bookGenre.id = uuidv4();
      bookGenre.book = newBook;
      bookGenre.genre = genre;
      return bookGenre;
    });
    newBook.bookGenres = existingGenre;

    existingGenre.forEach(async (bookGenre) => {
      await bookGenre.save();
    });

    await newBook.save();
    return adaptBookToRepositoryOutput(newBook);
  }

  /**
   * Update a book
   * @param book Book's data
   * @returns Updated book
   * @throws 500: book was not updated
   * @throws 404: book with this ID was not found
   */
  public async updateBook(
    inputBook: UpdateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    return this.save(inputBook);
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
