import { Controller, Get, Param } from '@nestjs/common';
import {
  AuthorPresenter,
  PlainAuthorPresenter,
} from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }
}
