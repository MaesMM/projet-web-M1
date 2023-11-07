import { Injectable } from '@nestjs/common';
import { Author } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models';
import { DataSource, Repository } from 'typeorm';
// import { 
//   PlainAuthorRepositoryOutput,
//   AuthorRepositoryOutput,
// } from 'library-api/src/repositories/authors/author.repository.type';

// import {
//   adaptAuthorEntityToAuthorModel,
//   adaptAuthorEntityToPlainAuthorModel,
// } from 'library-api/src/repositories/books/book.utils';
// import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

//   /**
//    * get  all authors
//    * @returns Array of plain authors
//    */

//   public async getAllPlain(): Promise<PlainAuthorModel[]>{
//     const authors = await this.find({
//       relations: { books: true },
//     });
//     return authors.map(adaptAuthorEntityToPlainAuthorModel);
//   }
}