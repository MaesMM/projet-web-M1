import { nanoid } from 'nanoid';
import React from 'react';

type Props = {
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string | number;
};

export default function Select({
  name,
  options,
  defaultValue,
}: Props): React.ReactElement {
  return (
    <div className="px-4 py-2 bg-[#FFFFFF] rounded-full w-64">
      <select
        required
        defaultValue={defaultValue}
        className="rounded-full w-full"
        name={name}
      >
        {options.map((option) => (
          <option key={nanoid()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
Select.defaultProps = {
  defaultValue: undefined,
};
