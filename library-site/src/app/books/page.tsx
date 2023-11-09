/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Book } from '@/models';
import { getBooks } from '@/requests/books';
import BooksTable from '@/component/table/booksTable';
import BooksSorter from '@/component/interaction/sorter/booksSorter';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const BooksPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  if (isLoading || isError || !books) {
    return <span>Loading...</span>;
  }

  const filteredBooks = books.filter((book: Book) => {
    const lowerCaseInput = inputValue.toLowerCase();
    const isMatchingAuthor =
      book.author.firstName.toLowerCase().includes(lowerCaseInput) ||
      book.author.lastName.toLowerCase().includes(lowerCaseInput);
    const isMatchingName = book.name.toLowerCase().includes(lowerCaseInput);

    const isMatchingDate = book.writtenOn.toString().includes(lowerCaseInput);

    if (typeFilter !== 'all') {
      return (
        (isMatchingAuthor || isMatchingName || isMatchingDate) &&
        book.genres.some(
          (genre) => genre.toLowerCase() === typeFilter.toLowerCase(),
        )
      );
    }

    return isMatchingAuthor || isMatchingName || isMatchingDate;
  });

  const data = filteredBooks.map((book: Book) => ({
    href: book.id,
    data: [
      { label: 'Titre', value: book.name, size: 'lg' },
      { label: 'Date', value: String(book.writtenOn), size: 'md' },
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
      <BooksSorter
        setInputValue={setInputValue}
        setTypeFilter={setTypeFilter}
      />
      <BooksTable data={data as Data[]} />
    </div>
  );
};

export default BooksPage;
