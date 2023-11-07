import { ReactElement } from 'react';
import Container from '@/component/container';
import SearchBar from '../input/Search';
import OrderBySelect from '../select/orderBy';

type Props = {
  options: { label: string; value: string }[];
  setInputValue: (value: string) => void;
  setTypeSort: (value: string) => void;
};

const Sorter = ({
  options,
  setInputValue,
  setTypeSort,
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
    <OrderBySelect
      options={options}
      onChange={(value: string): void => {
        setTypeSort(value);
      }}
    />
  </Container>
);

export default Sorter;
