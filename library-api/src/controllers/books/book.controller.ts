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

  //BEGIN REQUEST CREATE
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

