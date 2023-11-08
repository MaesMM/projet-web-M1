/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const authors = [
  {
    id: '1',
    firstName: 'Antone',
    lastName: 'Monteil',
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Dupont',
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Dupont',
  },
];

const AuthorsPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('firstname');

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
