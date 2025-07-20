import {ReactNode} from 'react';

export default function Container({children}: {children: ReactNode}) {
  return <div className='flex flex-col gap-1'>{children}</div>;
}
