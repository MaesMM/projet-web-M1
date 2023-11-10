import { BookModel, PlainBookModel } from 'library-api/src/models';
import { CreateBookRepositoryInput, UpdateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';

export type PlainBookUseCasesOutput = PlainBookModel;
export type BookUseCasesOutput = BookModel;
export type CreateBookUseCasesInput = CreateBookRepositoryInput;
export type UpdateBookUseCasesInput = UpdateBookRepositoryInput;
export type BookUseCasesInput = CreateBookUseCasesInput | UpdateBookUseCasesInput;

export const convertBookModelToPlainBookModel = (book: BookModel): PlainBookModel => {
    const plainBook: PlainBookModel = {
      id: book.id,
      name: book.name,
      writtenOn: book.writtenOn,
      author: book.author, 
      genres: book.genres.map((genre) => genre.name), 
    };
  
    return plainBook;
  };
