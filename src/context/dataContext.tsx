import {createContext, ReactNode, useContext, useState} from 'react';
export interface Data {
  src: string;
}
const initialValue = {src: ''};
const dataContext = createContext<{data: Data; setData: (data: Data) => void}>({
  data: initialValue,
  setData: () => {},
});
export function DataProvider({children}: {children: ReactNode}) {
  const [data, setData] = useState<Data>(initialValue);
  return (
    <dataContext.Provider value={{data, setData}}>
      {children}
    </dataContext.Provider>
  );
}
export function useData() {
  if (!dataContext)
    throw new Error('useCursor must be used within a DataProvider');
  const context = useContext(dataContext);
  return context;
}
