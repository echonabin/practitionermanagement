import * as React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  varient: 'primary' | 'secondary' | 'terciary';
  IconLeft?: IconType;
  IconRight?: IconType;
  title: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps) => {
  const {
    title = 'Button',
    varient = 'primary',
    IconLeft,
    IconRight,
    disabled,
    onClick,
    className,
    type = 'button',
  } = props;
  const baseStyle = `flex font-poppins items-center justify-center py-2 px-4 rounded-full font-regular focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-linear ${className}`;
  const styles = {
    primary: `${baseStyle} bg-blue-500 hover:bg-blue-700 text-white`,
    secondary: `${baseStyle} hover:bg-gray-500 hover:text-white text-gray-500 border-[1px] border-gray-500`,
    terciary: `${baseStyle} bg-blue-500 hover:bg-blue-700 text-white`,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles[varient]}
      type={type}
    >
      {IconLeft && (
        <IconLeft className="mr-4" color="#fff" height={24} width={24} />
      )}
      {title}
      {IconRight && (
        <IconRight className="ml-3" color="#fff" height={24} width={24} />
      )}
    </button>
  );
};

export default Button;
