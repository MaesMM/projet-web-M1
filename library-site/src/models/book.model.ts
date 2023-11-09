export type PlainBookModel = {
  id: string;
  name: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  writtenOn: number;
  genres: string[];
};

export type Book = {
  id: string;
  name: string;
  writtenOn: number;
  genres: {
    id: string;
    name: string;
  }[];
  //   genres: string[];
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type CreateBook = {
  name: string;
  writtenOn: string;
  genres: string[];
  authorId: string;
};
