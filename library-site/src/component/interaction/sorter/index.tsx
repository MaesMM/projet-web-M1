/* eslint-disable operator-linebreak */
import { ReactElement } from 'react';
import Container from '@/component/container';
import SearchBar from '../input/Search';
import FilterBySelect from '../select/filterBy';

type Props = {
  setInputValue: (value: string) => void;
  filterByOptions?: { label: string; value: string }[];
  setTypeFilter?: (value: string) => void;
};

const Sorter = ({
  filterByOptions,
  setInputValue,
  setTypeFilter,
}: Props): ReactElement => (
  <Container className="flex gap-8 justify-between relative">
    <SearchBar
      placeholder="Search"
      name="search"
      type="text"
      onChange={(e: string): void => {
        setInputValue(e);
      }}
    />
    {setTypeFilter &&
      filterByOptions && ( // Correction de la virgule
        <FilterBySelect
          options={filterByOptions}
          onChange={(value: string): void => {
            setTypeFilter(value);
          }}
        />
      )}
  </Container>
);

Sorter.defaultProps = {
  setTypeFilter: undefined,
  filterByOptions: undefined,
};

export default Sorter;
