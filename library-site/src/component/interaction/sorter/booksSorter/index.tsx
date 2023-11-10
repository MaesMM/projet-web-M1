import React from 'react';
import { useQuery } from 'react-query';
import Sorter from '..';
import { Genre } from '@/models/genre.model';
import { getGenres } from '@/requests/genre';

type Props = {
  setInputValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function BooksSorter({
  setInputValue,
  setTypeFilter,
}: Props): React.ReactElement {
  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
  });

  if (isLoading || isError || !genres) {
    return <span>Loading...</span>;
  }

  const data = genres.map((genre: Genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  return (
    <Sorter
      label="Genres"
      setInputValue={setInputValue}
      filterByOptions={[{ label: 'Tous', value: 'all' }, ...data]}
      setTypeFilter={setTypeFilter}
    />
  );
}
