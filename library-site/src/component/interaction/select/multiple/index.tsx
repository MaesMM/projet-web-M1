import { nanoid } from 'nanoid';
import React, { useState } from 'react';

type Props = {
  defaultValues?: string[];
  name: string;
  options?: { value: string; label: string }[];
};
export default function SelectMultiple({
  name,
  defaultValues,
  options,
}: Props): React.ReactElement {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValues || [],
  );

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const optionsOfSelect = event.target.options;
    const value: string[] = [];
    for (let i = 0, l = optionsOfSelect.length; i < l; i += 1) {
      if (optionsOfSelect[i].selected) {
        value.push(optionsOfSelect[i].value);
      } else {
        const index = value.indexOf(optionsOfSelect[i].value);
        if (index !== -1) {
          value.splice(index, 1);
        }
      }
    }
    setSelectedOptions(value);
  };

  return (
    <div>
      <input name={name} type="hidden" value={selectedOptions} />
      <select
        multiple
        value={selectedOptions}
        onChange={handleSelectChange}
        className="w-64 rounded-xl px-4 py-2"
      >
        {options?.map((option) => (
          <option key={nanoid()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectMultiple.defaultProps = {
  defaultValues: undefined,
  options: undefined,
};
