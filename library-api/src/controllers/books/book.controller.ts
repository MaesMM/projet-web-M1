import {
  Controller,
  Get,
  Param,
  //   Post,
  Delete,
  //   Body,
  //   Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { AuthorUseCases, BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto } from './create-book.dto';
import { CreateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';
import { NotFoundError } from 'rxjs';
@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(
    private readonly bookUseCases: BookUseCases,
    private readonly authorUseCases: AuthorUseCases,
  ) {}


  @Get('/')
  public async getAll(): Promise<BookPresenter[]> {
  public async getAll(): Promise<BookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map((book) => BookPresenter.from(book));
    return books.map((book) => BookPresenter.from(book));
  }

 @Get('/:id')
 @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);


    return BookPresenter.from(book);
  }

 
  @Post('/create')
  public async createBook(
    @Body() bodyContent: CreateBookDto,
  ): Promise<BookPresenter> {
    // ou Promise<BookPresenter> pour renvoyer un objet
    const author = await this.authorUseCases.getById(bodyContent.authorId);


    if (!author) {
      // Handle the case where the author with the given ID doesn't exist
      throw new NotFoundError(`Author - '${bodyContent.authorId}'`);
    }

    const newbook: CreateBookRepositoryInput = {
      name: bodyContent.name,
      writtenOn: bodyContent.writtenOn,
      author: author,
      genres: bodyContent.genres,
    };

    const createdBook = await this.bookUseCases.create(newbook);
    console.log(createdBook);
    return BookPresenter.from(createdBook);
  }

  // @Patch('/:id')  
  // public async updateBook(
  //   @Param('id') id: BookId,
  //   @Body() bodyContent: CreateBookDto,
  // ): Promise<BookPresenter> {
  //   const book = await this.bookUseCases.getById(id);
  //   //traiter les cas de renseignementnou non des differents champs


  //     return BookPresenter.from(updatedBook);
  //   }
  // }

  @Delete('/:id')
  public async deleteBook(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);
    if (book) {
      await this.bookUseCases.deleteBook(id);
    }
    return BookPresenter.from(book);
  }
}
