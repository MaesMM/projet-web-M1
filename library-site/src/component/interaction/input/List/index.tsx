import React, { useState } from 'react';
import Button from '../../button';

type Props = {
  data: string[];
};

const InputList = ({ data }: Props): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<string[]>(data);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <input
          name="genre"
          onChange={(e): void => {
            setInputValue(e.target.value);
          }}
          className="px-4 py-2 h-fit rounded-full"
          type="text"
        />
        <Button
          onClick={(): void => {
            setList([...list, inputValue]);
          }}
          text="Ajouter"
          className="bg-white-600 text-sm"
        />
      </div>
      <div className="flex gap-2">
        {list.map((genre) => (
          <div className="flex gap-1 bg-gray-200 items-center rounded-full px-2 py-1">
            <span className="text-sm">{genre}</span>
            <span>X</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputList;
