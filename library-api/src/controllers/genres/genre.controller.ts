import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenrePresenter } from './genre.presenter';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Get all genres',
    type: GenrePresenter,
    isArray: true,
  })
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }
}
