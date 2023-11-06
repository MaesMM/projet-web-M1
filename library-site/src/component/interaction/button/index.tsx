import React from 'react';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

type ButtonProps = {
  icon?: StaticImageData;
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
};

const Button = ({
  icon,
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
      'px-4 py-3 rounded-full hover:bg-gray-200 hover:transition-all duration-250 flex text-gray-800 items-center gap-3',
      className,
    )}
  >
    {icon && (
      <Image src={icon.src} alt="Pen" height={icon.height} width={icon.width} />
    )}
    {text && <span>{text}</span>}
  </button>
);

Button.defaultProps = {
  icon: undefined,
  className: undefined,
  onClick: (): void => {},
  text: undefined,
  type: 'button',
};

export default Button;
