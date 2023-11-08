import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto } from './create-book.dto';
import { CreateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';
import { CreateBookUseCasesInput } from 'library-api/src/useCases/books/book.useCases.type';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  //BEGIN REQUEST CREATE
  // @Post('/create')
  // public async createBook(@Body() bodyContent : CreateBookDto ) : Promise<void>{   // ou Promise<CreateBookUseCasesInput> ??
  //   //get author id
  //   en attente des methods read author
  //   if(bodyContent.authorId){
  //     const author = await this.authorUseCases.getAuthorById(bodyContent.authorId);
  //     if(author){
  //       bodyContent.author = author;
  //     }
  //   }
  //   const book= await this.bookUseCases.create(bodyContent);
  //   // return BookPresenter.from(book);
  // }
  // END REQUEST CREATE

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
