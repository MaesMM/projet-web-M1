import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  Icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
};

const Button = ({
  Icon,
  text,
  onClick,
  className,
  type,
}: ButtonProps): React.ReactElement => (
  <button
    type={type === 'button' ? 'button' : 'submit'}
    onClick={(): void => {
      if (onClick) {
        onClick();
      }
    }}
    className={clsx(
      'px-4 py-3 rounded-xl hover:bg-gray-200 hover:transition-all duration-250 flex text-gray-800 items-center gap-3',
      className,
    )}
  >
    {/* <Icon /> */}
    {Icon}
    {text && <span>{text}</span>}
  </button>
);

Button.defaultProps = {
  Icon: undefined,
  className: undefined,
  onClick: (): void => {},
  text: undefined,
  type: 'button',
};

export default Button;
