import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { PlainAuthorModel, AuthorModel } from 'library-api/src/models';
import { AuthorRepository } from 'library-api/src/repositories';

describe('AuthorController', () => {
  let controller: AuthorController;
  let useCases: AuthorUseCases;

  function toAuthorId(id: string): AuthorId {
    return id as AuthorId;
  }

  beforeEach(async () => {
    const plainAuthorModel: PlainAuthorModel = {
      id: toAuthorId('123'),
      firstName: 'John',
      lastName: 'Doe',
    };

    const authorModel: AuthorModel = {
      id: toAuthorId('123'),
      firstName: 'John',
      lastName: 'Doe',
      photoUrl: 'http://example.com/photo.jpg',
      books: [],
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        AuthorUseCases,
        {
          provide: PlainAuthorPresenter,
          useValue: PlainAuthorPresenter.from(plainAuthorModel),
        },
        {
          provide: AuthorPresenter,
          useValue: AuthorPresenter.from(authorModel),
        },
        {
          provide: AuthorRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(authorModel),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    useCases = module.get<AuthorUseCases>(AuthorUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
