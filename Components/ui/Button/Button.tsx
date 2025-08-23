import React, { ReactNode } from 'react'
import clsx from 'clsx';


interface ButtonProps {
  size?: "small" | "medium" | "large";
  type: "submit" | "reset" | "button";
  label: string;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  disabled: boolean;
  loading: boolean;
}
const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  type,
  label,
  className,
  onClick,
  icon,
  disabled = false,
  loading = false,
  ...rest
}) => {

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-3 text-lg',
  }

  const baseClass = clsx('text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent',
    sizeClasses[size], className, (disabled || loading) && 'opacity-50 cursor-not-allowed')

  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={baseClass}
        {...rest}
      >
        {loading ? (
          <div className='flex items-center justify-center gap-2'>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <span>{label}</span>
            <span>{icon}</span>
          </>
        )}
      </button>
    </>
  )
}

export default Button