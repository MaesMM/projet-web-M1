import React from 'react';
import { nanoid } from 'nanoid';
import ListItem from '../listItem';

type Props = {
  data: { label: string; value: string; size: 'md' | 'lg' | 'xl' }[];
  onClick?: () => void;
};

const Row = ({ data, onClick }: Props): React.ReactElement => (
  <button
    onClick={(): void => onClick && onClick()}
    type="button"
    className="w-full px-4 py-2 h-24 items-center rounded-xl flex justify-between gap-8 border border-solid border-gray-200 hover:bg-gray-200 "
    aria-label="navigate to book page"
  >
    {data.map((item) => (
      <ListItem key={nanoid()} title={item.label} size={item.size}>
        <span className="text-sm">{item.value}</span>
      </ListItem>
    ))}
  </button>
);

Row.defaultProps = {
  onClick: undefined,
};

export default Row;
