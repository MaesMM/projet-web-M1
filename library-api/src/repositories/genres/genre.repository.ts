import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<GenreModel[]> {
    const genres = await this.find({
      relations: { bookGenres: { genre: true } },
    });

    return genres;
  }
}
