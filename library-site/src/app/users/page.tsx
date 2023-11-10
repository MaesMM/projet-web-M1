/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};
const users = [
  {
    id: '1',
    username: 'Antoinne Maes',
    books: [
      {
        id: '1',
        name: 'Hello',
        writtenOn: 2025,
        genres: ['Science fiction, action, amour'],
        author: {
          id: '1',
          firstName: 'Antoine',
          lastName: 'Monteil',
        },
      },
    ],
  },
  {
    id: '2',
    username: 'Antone Maes',
    books: [
      {
        id: '1',
        name: 'Hello',
        writtenOn: 2025,
        genres: ['Science fiction, action, amour'],
        author: {
          id: '1',
          firstName: 'Antoine',
          lastName: 'Monteil',
        },
      },
      {
        id: '1',
        name: 'Hello',
        writtenOn: 2025,
        genres: ['Science fiction, action, amour'],
        author: {
          id: '1',
          firstName: 'Antoine',
          lastName: 'Monteil',
        },
      },
    ],
  },
];

const UsersPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('username');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (typeSort === 'username') {
      return a.username.localeCompare(b.username);
    }
    if (typeSort === 'quantity') {
      return a.books.length - b.books.length;
    }

    return 0;
  });

  const data = sortedUsers.map((user) => ({
    href: user.id,
    data: [
      { label: 'Pseudonyme', value: user.username, size: 'md' },
      {
        label: 'Nombre de livre',
        value: String(user.books.length),
        size: 'md',
      },
    ],
  }));
  return (
    <div className="flex flex-col gap-8">
      <Sorter
        options={[
          { label: 'Nombre de livre', value: 'quantity' },
          { label: 'Pseudonyme', value: 'username' },
        ]}
        setInputValue={setInputValue}
        setTypeSort={setTypeSort}
      />
      <Table data={data as Data[]} modalTitle="Créer un utilisateur" />
    </div>
  );
};

export default UsersPage;
