import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import {
  AuthorRepositoryOutput,
  PlainAuthorRepositoryOutput,
} from './author.repository.type';
import { adaptAuthorEntityToAuthorModel } from './author.utils';
import { PlainAuthorModel } from 'library-api/src/models';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({
      relations: { books: true },
    });

    return authors.map(adaptAuthorEntityToAuthorModel);
  }

  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput | Author> {
    const author = await this.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundError(`Authors - '${id}'`);
    }
    return adaptAuthorEntityToAuthorModel(author);
  }

  public async getByIdTypeAuthor(id: AuthorId): Promise<Author> {
    const author = await this.findOne({
      where: { id },
      relations: { books: true },
    });

    if (!author) {
      throw new NotFoundError(`Authors - '${id}'`);
    }
    return author;
  }

  public async updatePlain(id: AuthorId, bodyContent: PlainAuthorModel): Promise<PlainAuthorModel> {
    const author = await this.getByIdTypeAuthor(id);
    author.firstName = bodyContent.firstName;
    author.lastName = bodyContent.lastName;
    await this.save(author);
    return author;
  }

  public async createPlain(bodyContent : {firstName : string, lastName : string}) : Promise<PlainAuthorModel>{
    const author = new Author();
    author.id = uuid();
    author.firstName = bodyContent.firstName;
    author.lastName = bodyContent.lastName;
    author.photoUrl = '';
    await this.save(author);
    return author;
  }

  public async deleteAuthor(id: AuthorId): Promise<AuthorRepositoryOutput> {
    const author = await this.getByIdTypeAuthor(id);
    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }
    await this.remove(author);
    return author
  }

}
