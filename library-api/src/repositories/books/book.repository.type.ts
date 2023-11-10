import { BookModel, PlainBookModel } from 'library-api/src/models/book.model';
import { AuthorId, GenreId } from 'library-api/src/entities';

export type PlainBookRepositoryOutput = PlainBookModel;
export type BookRepositoryOutput = BookModel;
export type CreateBookRepositoryInput = Omit<PlainBookModel, 'id'> & {
  author: { id: AuthorId; firstName: string; lastName: string };
} & { genres: GenreId[] }; //help me to visialize the type when hover over the variable
export type UpdateBookRepositoryInput = BookModel;
