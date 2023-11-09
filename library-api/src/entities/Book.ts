/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { Author } from './Author';
import { UserBook } from './UserBooks';

export type BookId = string & { __brand: 'Book' };

@Entity('Books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column()
  name: string;

  @Column({ type: 'date' })
  writtenOn: Date;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @OneToMany(() => UserBook, (userBook) => userBook.book)
  userBook: UserBook[];

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];
}
