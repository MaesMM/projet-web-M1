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
  const [typeFilter, setTypeFilter] = useState('all');
  const {
    data: authors,
    isLoading,
    isError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  if (isLoading || isError || !authors) return <span>Loading...</span>;

  const filteredAuthors = authors.filter((author: Author) => {
    const isMatchingLastName = author.lastName
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const isMatchingFirstName = author.firstName
      .toLowerCase()
      .includes(inputValue.toLowerCase());

    if (typeFilter !== 'all') {
      return (
        (isMatchingLastName || isMatchingFirstName) &&
        author.books.length.toString() === typeFilter
      );
    }

    return isMatchingLastName || isMatchingFirstName;
  });

  const data = filteredAuthors.map((author: Author) => ({
    href: author.id,
    data: [
      { label: 'Prénom', value: author.firstName, size: 'md' },
      { label: 'Nom', value: author.lastName, size: 'md' },
      {
        label: 'Nombre de livre(s)',
        value: author.books.length.toString(),
        size: 'md',
      },
    ],
  }));
  return (
    <div className="flex flex-col gap-8">
      <AuthorsSorter
        quantities={Array.from(
          new Set(authors.map((author) => author.books.length)),
        )}
        setInputValue={setInputValue}
        setTypeFilter={setTypeFilter}
      />
      <AuthorsTable data={data as Data[]} />
    </div>
  );
};

export default AuthorsPage;
