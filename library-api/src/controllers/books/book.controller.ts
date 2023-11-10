import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';

import { BookId, Genre, GenreId } from 'library-api/src/entities';
import { AuthorUseCases, BookUseCases, GenreUseCases } from 'library-api/src/useCases';
import { CreateBookDto, UpdateBookDto } from './create-book.dto';
import { CreateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';
import { NotFoundError } from 'rxjs';
import { GenreModel } from 'library-api/src/models';
@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(
    private readonly bookUseCases: BookUseCases,
    private readonly authorUseCases: AuthorUseCases,
    private readonly genreUseCases: GenreUseCases,
  ) {}


  @Get('/')
  public async getAll(): Promise<BookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map((book) => BookPresenter.from(book));
  }


  @Get('/:id')
  @ApiOkResponse({
    description: 'Get book by id',
    type: BookPresenter,
    isArray: true,
  })


  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/')
  @ApiOkResponse({
    description: 'Create book',
    type: CreateBookDto,
    isArray: true,
  })

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
      author,
      genres: bodyContent.genres as GenreId[],
    };

    const createdBook = await this.bookUseCases.create(newbook);
    return BookPresenter.from(createdBook);
  }


  @Patch('/:id')
  public async updateBook(@Param('id') id: BookId, @Body() bodyContent : UpdateBookDto) : Promise<BookPresenter> {
    const author = await this.authorUseCases.getById(bodyContent.authorId);
    
    if (!author) {
      throw new NotFoundError(`Author - '${bodyContent.authorId}'`);
    }
    
    let constGenres : GenreModel[] =[];
    let genreId : string[] = [];
    for (let i = 0; i < bodyContent.genres.length; i++) {
      const genre = await this.genreUseCases.getById(bodyContent.genres[i] as GenreId);
      if (!genre) {
        throw new NotFoundError(`GenreId - '${bodyContent.genres[i]}'`);
      }
      constGenres = GenreModel.push(constGenres, genre);
      genreId.push(genre.id);
      
    }

    const updateBook: CreateBookRepositoryInput = {
      name: bodyContent.name,
      writtenOn: bodyContent.writtenOn,
      author: author,
      genres: genreId as GenreId[],
    };
    const book = await this.bookUseCases.updateBook(id, updateBook);
    return BookPresenter.from(book);
  }


  @Delete('/:id')
  public async deleteBook(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);
    if (book) {
      await this.bookUseCases.deleteBook(id);
    }
    return BookPresenter.from(book);
  }
}
