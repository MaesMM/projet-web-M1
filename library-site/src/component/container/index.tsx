import React from 'react';
import { clsx } from 'clsx';
import Button from '../interaction/button';
import Edit from '../../../public/Edit.svg';
import Delete from '../../../public/Delete.svg';

type Props = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

const Container = ({
  children,
  className,
  title,
  onClickDelete,
  onClickEdit,
}: Props): React.ReactElement => (
  <div
    className={clsx(
      'flex w-full rounded-xl flex relative bg-white-500 px-4 py-4 shadow',
      className,
    )}
  >
    {title && (
      <div className="flex justify-between items-center w-full">
        <span className="text-xl font-medium">Information Generales</span>
        <div className="flex">
          {onClickEdit && (
            <Button
              onClick={onClickEdit}
              Icon={<Edit />}
              className="text-white-500 hover:text-white-600"
            />
          )}
          {onClickDelete && (
            <Button
              Icon={<Delete />}
              onClick={onClickDelete}
              className="hover:bg-red-500 text-white-500 hover:text-white-600"
            />
          )}
        </div>
      </div>
    )}

    {children}
  </div>
);

Container.defaultProps = {
  className: undefined,
  title: undefined,
  onClickDelete: undefined,
  onClickEdit: undefined,
};

export default Container;
