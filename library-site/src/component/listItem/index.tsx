import React from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
};

const ListItem = ({
  title,
  children,
  className,
  size,
}: Props): React.ReactElement => (
  <div
    className={clsx(
      'flex flex-col items-start gap-2',
      className,
      size === 'md' && 'flex-1',
      size === 'lg' && 'flex-[2]',
      size === 'xl' && 'flex-[3]',
    )}
  >
    <span className="text-sm font-thin">{title}</span>
    {children}
  </div>
);

ListItem.defaultProps = {
  className: undefined,
  size: 'md',
};

export default ListItem;
