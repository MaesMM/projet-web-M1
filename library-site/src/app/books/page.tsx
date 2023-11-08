/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';
import { useBooksProviders } from '@/hooks';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const BooksPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeSort, setTypeSort] = useState('name');

  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, []);

  const filteredBooks = books.filter(
    (book) =>
      book.author.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.author.lastName.toLowerCase().includes(inputValue.toLowerCase()) ||
      book.name.toLowerCase().includes(inputValue.toLowerCase()) ||
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
      { label: 'Titre', value: book.name, size: 'lg' },
      { label: 'Date de sortie', value: String(book.writtenOn), size: 'md' },
      { label: 'Genres', value: book.genres.join(', '), size: 'lg' },
      {
        label: 'Auteur',
        value: `${book.author.firstName} ${book.author.lastName}`,
        size: 'md',
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
      <Table data={data as Data[]} addButton />
    </div>
  );
};

export default BooksPage;
