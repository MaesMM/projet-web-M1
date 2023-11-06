'use client';

import { FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
// import { useBooksProviders } from '@/hooks';
import Container from '@/component/container';
import Input from '@/component/interaction/input/Search';
import Row from '@/component/row';

const books = [
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
    id: '2',
    name: 'allo',
    writtenOn: 2024,
    genres: ['Science fiction'],
    author: {
      id: '1',
      firstName: 'Antoine',
      lastName: 'Monteil',
    },
  },
  {
    id: '2',
    name: 'pom',
    writtenOn: 1960,
    genres: ['Science fiction'],
    author: {
      id: '1',
      firstName: 'Antoine',
      lastName: 'Monteil',
    },
  },
];

const BooksPage: FC = (): ReactElement => {
  //   const { useListBooks } = useBooksProviders();
  //   const { books, load } = useListBooks();

  //   useEffect(() => load, []);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('name');

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.author.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.author.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.genres.join(', ').toLowerCase().includes(inputValue.toLowerCase()) ||
      book.writtenOn.toString().includes(inputValue.toLowerCase()),
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (typeSort === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (typeSort === 'date') {
      return a.writtenOn - b.writtenOn;
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
            <option value="name">Nom</option>
            <option value="date">Date</option>
          </select>
        </div>
      </Container>
      <Container className="flex flex-col gap-4">
        <span className="text-sm">{`${filteredBooks.length} livre(s) trouvé(s)`}</span>
        <div className="flex flex-col gap-4">
          {sortedBooks.map((book) => (
            <Row
              onClick={(): void => router.push(`/books/${book.id}`)}
              data={[
                { label: 'Titre', value: book.name },
                {
                  label: 'Auteur',
                  value: `${book.author.firstName} ${book.author.lastName}`,
                },
                { label: 'Genres', value: book.genres.join(', ') },
                { label: 'Date', value: book.writtenOn as unknown as string },
              ]}
              key={nanoid()}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BooksPage;
