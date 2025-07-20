import {ReactNode} from 'react';

export default function OptionsContainer({
  children,
  className = '',
  style = 'primary',
}: {
  children?: ReactNode;
  className?: string;
  style?: 'primary' | 'secondary';
}) {
  const styles = {
    base: 'flex cursor-pointer items-center rounded-md justify-center p-1  ',
    primary: 'size-7 bg-slate-700 hover:bg-slate-650',
    secondary: 'size-5.5  ',
  };

  return <div className={`${styles.base} ${styles[style]} ${className}`}>{children}</div>;
}
