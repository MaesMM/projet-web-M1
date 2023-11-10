/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

export type UserBookId = string & { __brand: 'UserBook' };

@Entity('UserBook')
export class UserBook extends BaseEntity {
  @PrimaryColumn()
  id: UserBookId;

  @ManyToOne(() => Book, (book) => book.userBook, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.userBook, {
    onDelete: 'CASCADE',
  })
  user: User;
}
