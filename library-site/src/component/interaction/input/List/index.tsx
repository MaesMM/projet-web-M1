import React, { useState } from 'react';
import Delete from '../../../../../public/Close remove.svg';

type Props = {
  data: string[];
};

const InputList = ({ data }: Props): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<string[]>(data);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-thin">Genres</span>
      <div className="flex gap-2 items-center">
        <input
          name="genre"
          onChange={(e): void => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e): void => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (inputValue !== '' && !list.includes(inputValue)) {
                setList([...list, inputValue]);
              }
            }
          }}
          className="px-4 py-2 h-fit rounded-full"
          type="text"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {list.map((genre) => (
          <div className="flex gap-1 bg-gray-200 items-center rounded-full px-3 py-1">
            <span className="text-sm">{genre}</span>
            <Delete
              onClick={(): void => {
                setList(list.filter((item) => item !== genre));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputList;
