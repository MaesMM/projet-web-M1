import React from 'react';
import Sorter from '..';

type Props = {
  setInputValue: (value: string) => void;
  setTypeFilter: (value: string) => void;
  quantities: number[];
};

export default function AuthorsSorter({
  quantities,
  setInputValue,
  setTypeFilter,
}: Props): React.ReactElement {
  const data = quantities.map((quantity) => ({
    label: quantity.toString(),
    value: quantity.toString(),
  }));
  return (
    <Sorter
      label="Nombre de livre(s)"
      filterByOptions={[{ label: 'Tous', value: 'all' }, ...data]}
      setInputValue={setInputValue}
      setTypeFilter={setTypeFilter}
    />
  );
}
