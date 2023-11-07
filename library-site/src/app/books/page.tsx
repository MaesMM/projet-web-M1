'use client';

import { FC, ReactElement, useState } from 'react';
// import { useBooksProviders } from '@/hooks';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';

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

//   const { useListBooks } = useBooksProviders();
//   const { books, load } = useListBooks();

//   useEffect(() => load, []);

const BooksPage: FC = (): ReactElement => {
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

  const orderedBooks = [...filteredBooks].sort((a, b) => {
    if (typeSort === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (typeSort === 'date') {
      const dataA = String(a.writtenOn);
      const dataB = String(b.writtenOn);
      return dataA.localeCompare(dataB);
    }
    return 0;
  });

  const data = orderedBooks.map((book) => ({
    href: book.id,
    data: [
      { label: 'Name', value: book.name },
      { label: 'Written On', value: String(book.writtenOn) },
      { label: 'Genres', value: book.genres.join(', ') },
      {
        label: 'Author',
        value: `${book.author.firstName} ${book.author.lastName}`,
      },
    ],
  }));

  return (
    <div className="flex flex-col gap-8">
      <Sorter
        options={[
          { label: 'Name', value: 'name' },
          { label: 'Date', value: 'date' },
        ]}
        setInputValue={setInputValue}
        setTypeSort={setTypeSort}
      />
      <Table data={data} />
    </div>
  );
};

export default BooksPage;
