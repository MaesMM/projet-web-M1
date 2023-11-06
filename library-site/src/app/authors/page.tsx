'use client';

import { FC, ReactElement, useState } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import Container from '@/component/container';
import Input from '@/component/interaction/input/Search';
import Row from '@/component/row';

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
  const router = useRouter();
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
            <option value="lastName">Nom</option>
            <option value="firstName">Prénom</option>
          </select>
        </div>
      </Container>
      <Container className="flex flex-col gap-4">
        <span className="text-sm">{`${sortedAuthors.length} livre(s) trouvé(s)`}</span>
        <div className="flex flex-col gap-4">
          {sortedAuthors.map((author) => (
            <Row
              onClick={(): void => router.push(`/authors/${author.id}`)}
              data={[
                { label: 'Nom', value: author.lastName },
                { label: 'Prenom', value: author.firstName },
              ]}
              key={nanoid()}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AuthorsPage;
