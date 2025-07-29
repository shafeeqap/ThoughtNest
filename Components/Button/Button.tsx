import React, { ReactNode } from 'react'
import clsx from 'clsx';

interface ButtonProps {
  size?: "small" | "medium" | "large";
  type: "submit" | "reset" | "button";
  label: string;
  className?: string;
  onClick?: () => void;
  icon: ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  type,
  label,
  className,
  onClick,
  icon,
  ...rest
}) => {

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  }

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={clsx('text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent',
          sizeClasses[size],
          className)}
        {...rest}
      >
        {label}
        {icon}
      </button>
    </>
  )
}

export default Button