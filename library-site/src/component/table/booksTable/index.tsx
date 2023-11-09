import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import Table from '..';
import { Author } from '@/models';
import { getAuthors } from '@/requests/authors';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};
type Props = {
  data: Data[];
};

export default function BooksTable({ data }: Props): ReactElement {
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
      onSubmitModal={(e): void => console.log(e)}
      dataModalForm={[
        {
          label: 'Title',
          name: 'name',
          type: 'text',
        },
        {
          label: 'Author',
          name: 'author',
          type: 'select',
          options: authors.map((author: Author) => ({
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
      data={data as Data[]}
    />
  );
}
