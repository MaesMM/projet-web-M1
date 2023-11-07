import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import Search from '../../../../../public/Search.svg';

type Props = {
  className?: string;
  onChange?: (e: string) => void;
  name: string;
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'tel';
  value?: string;
};

const SearchBar = ({
  onChange,
  className,
  placeholder,
  name,
  type,
  value,
}: Props): React.ReactElement => (
  <div className={clsx('relative flex-1', className)}>
    <input
      className="bg-gray-200 py-2 px-4 w-full rounded-full relative"
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e): void => onChange && onChange(e.target.value)}
    />
    <Image
      className="absolute right-4 top-2"
      src={Search.src}
      alt="Pen"
      height={Search.height}
      width={Search.width}
    />
  </div>
);

SearchBar.defaultProps = {
  className: undefined,
  placeholder: undefined,
  value: undefined,
  onChange: (): void => {},
};

export default SearchBar;
