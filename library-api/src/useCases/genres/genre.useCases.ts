import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreUseCasesOutput } from './genre.useCases.type';
import { GenreModel } from 'library-api/src/models';
import { GenreId } from 'library-api/src/entities';

@Injectable()
export class GenreUseCases {
  constructor(private readonly bookRepository: GenreRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<GenreUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }


    /**
     * Get a book by its ID
     * @param id Book's ID
     * @returns Book if found
     * @throws 404: book with this ID was not found
     */
    public async getById(id: GenreId): Promise<GenreUseCasesOutput> {
      return this.bookRepository.getById(id);
    }
}