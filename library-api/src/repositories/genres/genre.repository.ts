import { Injectable, NotFoundException} from '@nestjs/common';
import { Genre, GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { adaptBookEntityToBookModel } from '../books/book.utils';
import { adaptGenreEntityToGenreModel } from './genre.utils';
import { GenreRepositoryOutput } from './genre.repository.type';

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

   /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
   public async getById(id: GenreId): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({
      where: { id: id },
      relations: { bookGenres: { genre: true }},
    });

    if (!genre) {
      throw new NotFoundException(`genre - '${id}'`);
    }
    return adaptGenreEntityToGenreModel(genre);
  }
}