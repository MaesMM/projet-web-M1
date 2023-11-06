import React from 'react';
import { nanoid } from 'nanoid';
import ListItem from '../listItem';

type Props = {
  data: { label: string; value: string }[];
  onClick?: () => void;
};

const Row = ({ data, onClick }: Props): React.ReactElement => (
  <button
    onClick={(): void => onClick && onClick()}
    type="button"
    className="w-full px-4 py-2 shadow rounded-xl flex justify-between gap-8"
    aria-label="navigate to book page"
  >
    {data.map((item) => (
      <ListItem
        key={nanoid()}
        className={item.label === 'Genres' ? 'flex-1' : undefined}
        title={item.label}
      >
        <span>{item.value}</span>
      </ListItem>
    ))}
  </button>
);

Row.defaultProps = {
  onClick: undefined,
};

export default Row;
