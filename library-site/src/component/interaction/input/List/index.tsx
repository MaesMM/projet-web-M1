import React, { useState } from 'react';
import Delete from '../../../../../public/Close remove.svg';

type Props = {
  data?: string[];
  name: string;
  title?: string;
};

const InputList = ({ data, name, title }: Props): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<string[]>(data || []);
  return (
    <div className="flex flex-col gap-2">
      {title && <span className="text-sm font-thin">{title}</span>}
      <div className="flex gap-2 items-center">
        <input
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
        <input name={name} className="hidden" value={list} />
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

InputList.defaultProps = {
  title: undefined,
  data: [],
};
export default InputList;
