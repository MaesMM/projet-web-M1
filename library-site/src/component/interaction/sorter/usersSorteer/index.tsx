import React from 'react';
import { useQuery } from 'react-query';
import Sorter from '..';
import { getBooks } from '@/requests/books';
import { Book } from '@/models';

type Props = {
  setInputValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function UsersSorter({
  setInputValue,
  setTypeFilter,
}: Props): React.ReactElement {
  const {
    data: books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
  } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  if (isErrorBooks || isLoadingBooks || !books) {
    return <span>Loading...</span>;
  }

  const data = books.map((book: Book) => ({
    label: book.name,
    value: book.id,
  }));

  return (
    <Sorter
      label="Livre(s)"
      filterByOptions={[{ label: 'Tous', value: 'all' }, ...data]}
      setInputValue={setInputValue}
      setTypeFilter={setTypeFilter}
    />
  );
}
