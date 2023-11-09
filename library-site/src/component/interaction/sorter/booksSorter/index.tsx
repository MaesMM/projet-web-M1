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
        {
          label: 'Science fiction',
          value: '1a3d2f9e-7b6c-4e5b-8a3d-5c6b8e9a4f5b',
        },
      ]}
      setTypeFilter={setTypeFilter}
    />
  );
}
