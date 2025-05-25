import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: sizeType;
}
type sizeType = 'sm' | 'base' | 'md' | 'lg';

function Button({
  variant = 'primary',
  children,
  size = 'base',
  onClick,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'rounded-md font-medium transition-all flex items-center justify-center';
  const primaryStyles =
    'bg-purple-300 text-white hover:bg-purple-400 dark:bg-slate-800 dark:hover:bg-slate-700';
  const secondaryStyles =
    'bg-white text-purple-500 border border-purple-500 hover:bg-purple-100';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;
  let sizeStyle;
  switch (size) {
    case 'sm':
      sizeStyle = 'size-6 md:size-8 lg:size-10';
      break;
    case 'base':
      sizeStyle = 'size-8 md:size-10 lg:size-12';
      break;
    case 'md':
      sizeStyle = 'size-12 md:size-14 lg:size-16';
      break;
    case 'lg':
      sizeStyle = 'size-14 md:size-15 lg:size-17';
      break;
  }
  return (
    <button
      className={`${baseStyles} ${styles} ${className} ${sizeStyle}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
