import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAuthorRepositoryInput } from 'library-api/src/repositories/authors/author.repository.type';

// Interface générique pour les types de sortie du repository
interface RepositoryOutput<T> {
  data: T;
  success: boolean;
  message?: string;
}

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Create a new author
   * @param inputAuthor
   * @throws 500: author was not created
   * @returns
   */
  public async createAuthor(
    inputAuthor: CreateAuthorRepositoryInput,
  ): Promise<RepositoryOutput<Author>> {
    const author = new Author();
    author.firstName = inputAuthor.firstName;
    author.lastName = inputAuthor.lastName;
    author.id = uuidv4();
    await author.save();

    return {
      data: author,
      success: true,
      message: 'Author created successfully',
    };
  }

  public async deleteAuthor(id: Author): Promise<RepositoryOutput<Author>> {
    const author = await this.getId(id);
    // const author = await this.findOne(id);

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    try {
      await this.delete(author.id);
      return {
        data: author,
        success: true,
        message: 'Author deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(`Author - '${id}'`);
    }
  }
}
