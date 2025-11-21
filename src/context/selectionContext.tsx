'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { Shape } from '@/types/shape';

interface SelectionContextType {
  selectedShape: Shape | null;
  setSelectedShape: (shape: Shape | null) => void;
  showOptionMenu: boolean;
  setShowOptionMenu: (show: boolean) => void;
  updateSelectedShape: (updates: Partial<Shape>) => void;
}

const SelectionContext = createContext<SelectionContextType>({
  selectedShape: null,
  setSelectedShape: () => {},
  showOptionMenu: false,
  setShowOptionMenu: () => {},
  updateSelectedShape: () => {},
});

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [showOptionMenu, setShowOptionMenu] = useState(false);

  const updateSelectedShape = (updates: Partial<Shape>) => {
    if (selectedShape) {
      const updatedShape = { ...selectedShape, ...updates };
      setSelectedShape(updatedShape);
    }
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedShape,
        setSelectedShape,
        showOptionMenu,
        setShowOptionMenu,
        updateSelectedShape,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
