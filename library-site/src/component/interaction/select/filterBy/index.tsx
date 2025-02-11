import React, { useState } from 'react';
import { nanoid } from 'nanoid';

type Props = {
  label: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const FilterBySelect = ({
  label,
  options,
  onChange,
}: Props): React.ReactElement => {
  const [selectValue, setSelectValue] = useState(options[0].value);
  return (
    <div className="flex gap-2 items-center">
      <span>{label}</span>
      <select
        onChange={(e): void => {
          onChange(e.target.value);
          setSelectValue(e.target.value);
        }}
        value={selectValue}
        className="px-4 py-2 bg-gray-200 rounded-xl"
      >
        {options.map((option) => (
          <option value={option.value} key={nanoid()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBySelect;
