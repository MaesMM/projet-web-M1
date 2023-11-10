export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  books: {
    id: string;
    name: string;
    writtenOn: number;
  }[];
};

export type CreateAuthor = {
  firstName: string;
  lastName: string;
};
