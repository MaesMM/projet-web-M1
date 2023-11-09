import React from 'react';
import Sorter from '..';

type Props = {
  setInputValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function BooksSorter({
  setInputValue,
  setTypeFilter,
}: Props): React.ReactElement {
  return (
    <Sorter
      label="Genres"
      setInputValue={setInputValue}
      filterByOptions={[
        { label: 'Tous', value: 'all' },
        { label: 'Science fiction', value: 'Science Fiction' },
      ]}
      setTypeFilter={setTypeFilter}
    />
  );
}
