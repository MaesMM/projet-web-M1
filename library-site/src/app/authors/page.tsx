/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Author } from '@/models';
import { getAuthors } from '@/requests/authors';
import AuthorsSorter from '@/component/interaction/sorter/authorsSorter';
import AuthorsTable from '@/component/table/authorsTable';

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
    (author: Author) =>
      author.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
      author.firstName.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // eslint-disable-next-line arrow-body-style
  const sortedAuthors: Author[] = [...filteredAuthors].sort((a, b) => {
    return typeSort === 'firstName' || typeSort === 'lastName'
      ? a[typeSort].localeCompare(b[typeSort])
      : 0;
  });

  const data = sortedAuthors.map((author: Author) => ({
    href: author.id,
    data: [
      { label: 'Prénom', value: author.firstName, size: 'md' },
      { label: 'Nom', value: author.lastName, size: 'md' },
    ],
  }));
  return (
    <div className="flex flex-col gap-8">
      <AuthorsSorter
        setInputValue={setInputValue}
        setTypeFilter={setTypeSort}
      />
      <AuthorsTable data={data as Data[]} />
    </div>
  );
};

export default AuthorsPage;
