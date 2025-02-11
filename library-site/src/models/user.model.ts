type Book = {
  id: string;
  name: string;
  writtenOn: number;
  genres: {
    id: string;
    name: string;
  }[];
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  favoriteBook: {id : string, name : string, writtenOn : number};
  userBook: Book[] | null[];
};

export type CreateUser = {
  firstName: string;
  lastName: string;
};
export type UpdateUser = {
  firstName: string;
  lastName: string;
  favoriteBook: string;
  // userBook: string[];
};
