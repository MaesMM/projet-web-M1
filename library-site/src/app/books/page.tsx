/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Book } from '@/models';
import { getBooks } from '@/requests/books';
import BooksTable from '@/component/table/booksTable';
import BooksSorter from '@/component/interaction/sorter/booksSorter';
import FilterBySelect from '@/component/interaction/select/filterBy';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const BooksPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [order, setOrder] = useState('name');

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
      book.author &&
      (book.author.firstName.toLowerCase().includes(lowerCaseInput) ||
        book.author.lastName.toLowerCase().includes(lowerCaseInput));
    const isMatchingName = book.name.toLowerCase().includes(lowerCaseInput);

    const isMatchingDate =
      book.writtenOn && book.writtenOn.toString().includes(lowerCaseInput);

    if (typeFilter !== 'all') {
      return (
        (isMatchingAuthor || isMatchingName || isMatchingDate) &&
        book.genres.some(
          (genre) =>
            genre.id && genre.id.toLowerCase() === typeFilter.toLowerCase(),
        )
      );
    }

    return isMatchingAuthor || isMatchingName || isMatchingDate;
  });

  const sortedUsers = [...filteredBooks].sort((a, b) => {
    if (order === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (order === 'date') {
      return a.writtenOn - b.writtenOn;
    }
    if (order === 'lastName') {
      return ((a.author && a.author.lastName) || '').localeCompare(
        (b.author && b.author.lastName) || '',
      );
    }
    if (order === 'firstName') {
      return ((a.author && a.author.firstName) || '').localeCompare(
        (b.author && b.author.firstName) || '',
      );
    }

    return 0;
  });

  const data = sortedUsers.map((book: Book) => ({
    href: book.id,
    data: [
      { label: 'Titre', value: book.name, size: 'lg' },
      { label: 'Date', value: String(book.writtenOn), size: 'md' },
      {
        label: 'Genres',
        value: book.genres && book.genres.map((genre) => genre.name).join(', '),
        size: 'lg',
      },
      {
        label: 'Auteur',
        value:
          book.author && `${book.author.firstName} ${book.author.lastName}`,
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
      <div className="flex justify-end">
        <FilterBySelect
          label="Trier par"
          options={[
            { label: 'Titre', value: 'name' },
            { label: 'Date', value: 'date' },
            { label: 'Nom', value: 'lastName' },
            { label: 'Prénom', value: 'firstName' },
          ]}
          onChange={(e): void => setOrder(e)}
        />
      </div>
      <BooksTable data={data as Data[]} />
    </div>
  );
};

export default BooksPage;
