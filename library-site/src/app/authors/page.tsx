/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';
import { Author } from '@/models';
import { getAuthors } from '@/requests/authors';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const AuthorsPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('firstName');
  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  if (isLoading || isError || !authors) return <span>Loading...</span>;

  const filteredAuthors = authors.filter(
    (author) =>
      author.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
      author.firstName.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    if (typeSort === 'lastName') {
      return a.lastName.localeCompare(b.lastName);
    }
    if (typeSort === 'firstName') {
      return a.firstName.localeCompare(b.firstName);
    }

    return 0;
  });

  const data = sortedAuthors.map((author) => ({
    href: author.id,
    data: [
      { label: 'Prénom', value: author.firstName, size: 'md' },
      { label: 'Nom', value: author.lastName, size: 'md' },
    ],
  }));
  return (
    <div className="flex flex-col gap-8">
      <Sorter
        options={[
          { label: 'Prénom', value: 'firstName' },
          { label: 'Nom', value: 'lastName' },
        ]}
        setInputValue={setInputValue}
        setTypeSort={setTypeSort}
      />
      <Table data={data as Data[]} addButton />
    </div>
  );
};

export default AuthorsPage;
