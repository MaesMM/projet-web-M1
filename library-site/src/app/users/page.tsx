'use client';

import { FC, ReactElement, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import Container from '@/component/container';
import Input from '@/component/interaction/input/Search';
import Row from '@/component/row';

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
    ],
  },
];

const UsersPage: FC = (): ReactElement => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('username');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (typeSort === 'username') {
      return a.username.localeCompare(b.username);
    }

    return 0;
  });
  return (
    <div className="flex flex-col gap-8">
      <Container className="flex gap-8 justify-between relative">
        <Input
          placeholder="Search"
          name="search"
          type="text"
          onChange={(e: string): void => setInputValue(e)}
        />

        <div className="flex gap-2 items-center">
          <span>Trier par</span>
          <select
            onChange={(e): void => setTypeSort(e.target.value)}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            <option value="username">Pseudonyme</option>
          </select>
        </div>
      </Container>
      <Container className="flex flex-col gap-4">
        <span className="text-sm">{`${sortedUsers.length} livre(s) trouvé(s)`}</span>
        <div className="flex flex-col gap-4">
          {sortedUsers.map((user) => (
            <Row
              onClick={(): void => router.push(`/users/${user.id}`)}
              data={[{ label: 'Pseudonyme', value: user.username }]}
              key={nanoid()}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UsersPage;
