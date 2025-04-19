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
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all';
  const primaryStyles =
    'bg-purple-500 text-white hover:bg-purple-600 transtion-all dark:bg-slate-800 dark:hover:bg-slate-700';
  const secondaryStyles =
    'bg-white text-purple-500 border border-purple-500 hover:bg-purple-100';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      className={`${baseStyles} ${styles} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
