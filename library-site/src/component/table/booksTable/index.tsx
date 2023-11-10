import React, { ReactElement } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Table from '..';
import { Author, CreateBook } from '@/models';
import { getAuthors } from '@/requests/authors';
import { createBook } from '@/requests/books';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};
type Props = {
  data: Data[];
};

export default function BooksTable({ data }: Props): ReactElement {
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
  if (!authors || isAuthorsError || isAuthorsLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Table
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
          options: [
            { value: '1', label: 'Science Fiction' },
            { value: '2', label: 'Science Fiction' },
            { value: '3', label: 'Science Fiction' },
            { value: '4', label: 'Science Fiction' },
            { value: '5', label: 'Science Fiction' },
            { value: '6', label: 'Science Fiction' },
            { value: '7', label: 'Science Fiction' },
            { value: '8', label: 'Science Fiction' },
          ],
        },
      ]}
      data={data as Data[]}
    />
  );
}
