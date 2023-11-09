import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { GenreUseCasesOutput } from './genre.useCases.type';

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
}
