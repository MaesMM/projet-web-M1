import React, { FormEvent } from 'react';
import { useQuery } from 'react-query';
import FormUpdate from '..';
import { Author, Book } from '@/models';
import { getAuthors } from '@/requests/authors';

type Props = {
  setIsModifying: (value: boolean) => void;
  book: Book;
};

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formValues = Object.fromEntries(formData.entries()) as {
    [k: string]: string | string[];
  };
  const genres = formValues.genres as string;
  formValues.genres = genres.split(',').map((genre: string) => genre.trim());
};

export default function FormUpdateBooks({
  setIsModifying,
  book,
}: Props): React.ReactElement {
  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  if (isAuthorsError || isAuthorsLoading || !authors) {
    return <span>Loading...</span>;
  }
  return (
    <FormUpdate
      onSubmit={handleSubmitForm}
      onCancel={(): void => setIsModifying(false)}
      data={[
        {
          label: 'Titre',
          name: 'name',
          type: 'text',
          defaultValue: book.name,
        },
        {
          label: 'Auteur',
          name: 'author',
          type: 'select',
          defaultValue: book.author.id,
          options: authors.map((author) => ({
            value: author.id,
            label: `${author.firstName} ${author.lastName}`,
          })),
        },
        {
          label: 'Date',
          name: 'date',
          type: 'number',
          defaultValue: book.writtenOn,
        },
        {
          label: 'Genres',
          name: 'genres',
          type: 'listInput',
          defaultValues: book.genres.map((obj) => obj),
        },
      ]}
    />
  );
}
