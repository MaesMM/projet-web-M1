import React from 'react';
import { clsx } from 'clsx';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ children, className }: Props): React.ReactElement => (
  <div
    className={clsx(
      'flex w-full rounded-xl flex justify-between relative bg-white-500 px-4 py-4 shadow',
      className,
    )}
  >
    {children}
  </div>
);

Container.defaultProps = {
  className: undefined,
};

export default Container;
