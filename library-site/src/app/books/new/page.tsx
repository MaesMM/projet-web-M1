'use client';

import { FormEvent, ReactElement } from 'react';
import { useQuery } from 'react-query';
import Container from '@/component/container';
import FormCreate from '@/component/form/formCreate';
import { getAuthors } from '@/requests/authors';
import { Author } from '@/models';

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // console.log(e);
};
export default function NewBook(): ReactElement {
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
    <Container>
      <FormCreate
        onSubmit={handleSubmitForm}
        data={[
          {
            label: 'Title',
            name: 'name',
            type: 'text',
          },
          {
            label: 'Author',
            name: 'author',
            type: 'select',
            options: authors.map((author) => ({
              value: author.id,
              label: `${author.firstName} ${author.lastName}`,
            })),
          },
          {
            label: 'Date',
            name: 'date',
            type: 'number',
          },
          {
            label: 'Genre',
            name: 'genre',
            type: 'listInput',
          },
        ]}
      />
    </Container>
  );
}
