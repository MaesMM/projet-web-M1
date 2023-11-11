'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import ListItem from '../../listItem';
import Button from '../../interaction/button';
import InputList from '../../interaction/input/List';
import { DataCreateForm } from '@/models/form';
import Select from '@/component/interaction/select';
import SelectMultiple from '@/component/interaction/select/multiple';

type Props = {
  data: DataCreateForm[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function FormUpdate({
  data,
  onSubmit,
  onCancel,
}: Props): React.ReactElement {
  return (
    <form onSubmit={(e): void => onSubmit(e)} className="flex flex-col gap-4">
      {data.map((obj) => (
        <ListItem key={nanoid()} title={obj.label}>
          {obj.type === 'select' && !obj.multiple && obj.options && (
            <Select
              name={obj.name}
              options={obj.options}
              defaultValue={obj.defaultValue}
              required={obj.required}
            />
          )}
          {obj.type === 'select' && obj.multiple && (
            <SelectMultiple
              name={obj.name}
              options={obj.options}
              defaultValues={obj.defaultValues}
              required={obj.required}
            />
          )}
          {(obj.type === 'text' || obj.type === 'number') && (
            <input
              name={obj.name}
              className="px-4 py-2 rounded-full w-64"
              defaultValue={obj.defaultValue}
              type={obj.type}
              required
            />
          )}
          {obj.type === 'listInput' && (
            <InputList name={obj.name} data={obj.defaultValues} />
          )}
        </ListItem>
      ))}

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel} className="text-sm" text="Annuler" />
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-sm"
          text="Modifier"
        />
      </div>
    </form>
  );
}
