'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import ListItem from '../../listItem';
import Button from '../../interaction/button';
import InputList from '../../interaction/input/List';

type Props = {
  data: {
    label: string;
    name: string;
    type: 'select' | 'text' | 'number' | 'listInput';
    defaultValue?: string | number;
    defaultValues?: string[];
    options?: { value: string; label: string }[];
  }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormCreate({
  data,
  onSubmit,
}: Props): React.ReactElement {
  return (
    <form
      onSubmit={(e): void => onSubmit(e)}
      className="flex w-full flex-col gap-4"
    >
      {data.map((obj) => (
        <ListItem key={nanoid()} title={obj.label}>
          {obj.type === 'select' && (
            <div className="px-4 py-2 bg-[#FFFFFF] rounded-full w-64">
              <select
                required
                defaultValue={obj.defaultValue}
                className="rounded-full w-full"
                name={obj.name}
              >
                {obj.options?.map((option) => (
                  <option key={nanoid()} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {obj.type === 'text' && (
            <input
              name={obj.name}
              className="px-4 py-2 rounded-full w-64"
              defaultValue={obj.defaultValue}
              type="text"
              required
            />
          )}
          {obj.type === 'number' && (
            <input
              name={obj.name}
              className="px-4 py-2 w-xl rounded-full w-64"
              defaultValue={obj.defaultValue}
              type="number"
              required
            />
          )}
          {obj.type === 'listInput' && (
            <InputList name={obj.name} data={obj.defaultValues} />
          )}
        </ListItem>
      ))}

      <div className="flex gap-4 justify-end">
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-sm"
          text="Créer"
        />
      </div>
    </form>
  );
}
