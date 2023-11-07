import React from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

const ListItem = ({
  title,
  children,
  className,
}: Props): React.ReactElement => (
  <div className={clsx('flex flex-col items-start gap-2', className)}>
    <span className="text-sm font-thin">{title}</span>
    {children}
  </div>
);

ListItem.defaultProps = {
  className: undefined,
};

export default ListItem;
