import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookUseCases } from 'library-api/src/useCases';
import { BookPresenter, PlainBookPresenter } from './book.presenter';
import { BookId } from 'library-api/src/entities';
import { PlainBookModel, BookModel } from 'library-api/src/models';
import { BookRepository } from 'library-api/src/repositories';
import { v4 as uuidv4 } from 'uuid';
import { AuthorId, Author } from 'library-api/src/entities/Author';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import { AuthorRepository } from 'library-api/src/repositories/authors/author.repository';

describe('BookController', () => {
  let controller: BookController;
  let useCases: BookUseCases;

  function toBookId(id: string): BookId {
    return id as BookId;
  }

  beforeEach(async () => {
    const plainBookModel: PlainBookModel = {
      id: toBookId('123'),
      name: 'Book Title', // Utilisez 'name' au lieu de 'title'
      writtenOn: new Date('2020-01-01'),
      author: { id: uuidv4() as AuthorId, firstName: 'John', lastName: 'Doe' },
      genres: ['Fantasy', 'Science Fiction'],
    };

    const mockAuthor: Author = {
        id: uuidv4() as AuthorId,
        firstName: 'Gilles',
        lastName: 'John',
        books: [],
        hasId: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
        reload: jest.fn(),
        softRemove: jest.fn(),
        recover: jest.fn(),
    };

    const bookModel: BookModel = {
      id: toBookId('456'),
      author: mockAuthor,
      name: 'Book Title 2',
      writtenOn: new Date('2020-01-01'),
      userBook: [],
      genres: [],

      // other properties...
    };

    const module: TestingModule = await Test.createTestingModule({
        controllers: [BookController],
        providers: [
          BookUseCases,
          AuthorUseCases,
          {
            provide: AuthorRepository,
            useValue: {
              // mock methods as needed
            },
          },
          {
            provide: PlainBookPresenter,
            useValue: PlainBookPresenter.from(plainBookModel),
          },
          {
            provide: BookPresenter,
            useValue: BookPresenter.from(bookModel),
          },
          {
            provide: BookRepository,
            useValue: {
              findOne: jest.fn().mockResolvedValue(bookModel),
            },
          },
        ],
      }).compile();

    controller = module.get<BookController>(BookController);
    useCases = module.get<BookUseCases>(BookUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
