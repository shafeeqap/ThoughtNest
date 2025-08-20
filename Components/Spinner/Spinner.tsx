import React from 'react';

interface SpinnerProps {
  size?: "small" | "medium";
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {

  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
  }

  return (
    <div className={`flex justify-center items-center ${size === 'small' ? 'py-4' : 'py-8'}`}>
      <div className={`${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
