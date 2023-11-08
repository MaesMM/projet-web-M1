/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import Table from '@/component/table';
import Sorter from '@/component/interaction/sorter';
import { Author, Book } from '@/models';
import { getBooks } from '@/requests/books';
import { getAuthors } from '@/requests/authors';

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

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  if (
    isLoading ||
    isError ||
    !books ||
    isAuthorsError ||
    isAuthorsLoading ||
    !authors
  ) {
    return <span>Loading...</span>;
  }

  const filteredBooks = books.filter((book) => {
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

  const data = filteredBooks.map((book) => ({
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
      <Sorter
        setInputValue={setInputValue}
        filterByOptions={[
          { label: 'Tous', value: 'all' },
          { label: 'Science fiction', value: 'Science Fiction' },
        ]}
        setTypeFilter={setTypeFilter}
      />
      <Table
        modalTitle="Créer un livre"
        onSubmitModal={(e): void => console.log(e)}
        dataModalForm={[
          {
            label: 'Title',
            name: 'name',
            type: 'text',
          },
          {
            label: 'Author',
            name: 'author',
            type: 'select',
            options: authors.map((author) => ({
              value: author.id,
              label: `${author.firstName} ${author.lastName}`,
            })),
          },
          {
            label: 'Date',
            name: 'date',
            type: 'number',
          },
          {
            label: 'Genre',
            name: 'genre',
            type: 'listInput',
          },
        ]}
        data={data as Data[]}
      />
    </div>
  );
};

export default BooksPage;
