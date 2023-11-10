import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';

import {
  AuthorPresenter,
  PlainAuthorPresenter,
} from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { UpdateBookDto } from './author.controller.dto';
@ApiTags('Authors')

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<AuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(AuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: AuthorId,
    @Body() bodyContent: UpdateBookDto,
  ): Promise<PlainAuthorPresenter> {
    const plainAuhtor : PlainAuthorPresenter = {
      firstName: bodyContent.firstName,
      lastName: bodyContent.lastName,
      id: id,
    }
    const author = await this.authorUseCases.update(id, plainAuhtor);

    return PlainAuthorPresenter.from(author);
  }

}
