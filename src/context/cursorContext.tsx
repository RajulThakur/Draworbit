import {NavbarType} from '@/Type/navbarType';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const cursorContext = createContext<{
  cursor: NavbarType;
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
  setCursor: Dispatch<SetStateAction<NavbarType>>;
}>({cursor: 'hand', scale: 1, setScale: () => {}, setCursor: () => {}});
export function CursorProvider({children}: {children: ReactNode}) {
  const [cursor, setCursor] = useState<NavbarType>('hand');
  const [scale, setScale] = useState<number>(1);
  return (
    <cursorContext.Provider value={{cursor, scale, setCursor, setScale}}>
      {children}
    </cursorContext.Provider>
  );
}
export function useCursor() {
  if (!cursorContext)
    throw new Error('useCursor must be used within a CursorProvider');
  const context = useContext(cursorContext);
  return context;
}
