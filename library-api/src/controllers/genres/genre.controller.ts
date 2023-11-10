import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenrePresenter } from './genre.presenter';
import { GenreId } from 'library-api/src/entities';
import { stringToGenreId } from 'library-api/src/repositories/genres/genre.utils';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.getById(stringToGenreId(id));

    return GenrePresenter.from(genre);
  }
}
