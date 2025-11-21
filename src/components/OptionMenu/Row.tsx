import {ReactNode} from 'react';

export default function Row({children}: {children: ReactNode}) {
  return <div className="flex items-center gap-2 justify-start flex-wrap">{children}</div>;
}
