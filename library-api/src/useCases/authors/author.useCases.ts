import { AuthorId } from 'library-api/src/entities';
import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import {
  AuthorUseCasesOutput,
  PlainAuthorUseCasesOutput,
  UpdateAuthorUseCasesInput,
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  public async getById(id: AuthorId): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  public async update(id: AuthorId, bodyContent: UpdateAuthorUseCasesInput ): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.updatePlain(id, bodyContent);
  
  }
}
