/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBook } from './UserBooks';
import { Book } from './Book';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Book, (book) => book.name, { onDelete: 'CASCADE' })
  favoriteBook: Book;

  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBook: UserBook[];
}