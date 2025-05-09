import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({
  variant = 'primary',
  children,
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

  return (
    <button
      className={`${baseStyles} ${styles} ${className} size-8 md:size-10 lg:size-12`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
