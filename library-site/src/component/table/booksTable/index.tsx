/* eslint-disable operator-linebreak */
import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Table from '..';
import { Author, CreateBook, Genre } from '@/models';
import { getAuthors } from '@/requests/authors';
import { createBook } from '@/requests/books';
import { getGenres } from '@/requests/genres';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};
type Props = {
  isAdding?: boolean;
  data: Data[];
  title?: string;
};

export default function BooksTable({
  data,
  isAdding,
  title,
}: Props): ReactElement {
  const queryClient = useQueryClient();

  const createBookMutation = useMutation({
    mutationFn: (book: CreateBook) => createBook(book),
    onSuccess: () => queryClient.invalidateQueries(['books']),
  });

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { authorId, name, writtenOn } = formValues;
    const genres = formValues.genresId.split(',');

    const book: CreateBook = {
      authorId,
      genres,
      name,
      writtenOn,
    };
    createBookMutation.mutate(book as CreateBook);
  }

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
  });

  if (
    isLoading ||
    isError ||
    !genres ||
    !authors ||
    isAuthorsError ||
    isAuthorsLoading
  ) {
    return <span>Loading...</span>;
  }

  const genreOptions = genres.map((genre: Genre) => ({
    label: genre.name,
    value: genre.id,
  }));
  if (isAdding) {
    return (
      <Table
        title={title}
        pathname="/books/"
        modalTitle="Créer un livre"
        onSubmitModal={(e): void => HandleSubmit(e)}
        dataCreateForm={[
          {
            label: 'Title',
            name: 'name',
            type: 'text',
          },
          {
            label: 'Author',
            name: 'authorId',
            type: 'select',
            options: authors.map((author: Author) => ({
              value: author.id,
              label: `${author.firstName} ${author.lastName}`,
            })),
          },
          {
            label: 'Date',
            name: 'writtenOn',
            type: 'number',
          },
          {
            label: 'Genre',
            name: 'genresId',
            type: 'select',
            multiple: true,
            //   selectOptions,
            options: genreOptions,
          },
        ]}
        data={data as Data[]}
      />
    );
  }
  return <Table title={title} data={data as Data[]} pathname="/books" />;
}
BooksTable.defaultProps = {
  isAdding: true,
  title: undefined,
};
