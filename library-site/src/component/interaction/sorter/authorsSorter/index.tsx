import React from 'react';
import Sorter from '..';

type Props = {
  setInputValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
};

export default function AuthorsSorter({
  setInputValue,
  setTypeFilter,
}: Props): React.ReactElement {
  return (
    <Sorter
      label="Trier par"
      filterByOptions={[
        { label: 'Prénom', value: 'firstName' },
        { label: 'Nom', value: 'lastName' },
      ]}
      setInputValue={setInputValue}
      setTypeFilter={setTypeFilter}
    />
  );
}
