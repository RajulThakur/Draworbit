'use client';

import {createContext, ReactNode, useContext, useState, useEffect} from 'react';

interface ColorContextType {
  strokeColor: string;
}

const ColorContext = createContext<ColorContextType>({strokeColor: '#000000'});

export function ColorProvider({children}: {children: ReactNode}) {
  const [strokeColor, setStrokeColor] = useState('#000000');

  useEffect(() => {
    // Check dark mode after component mounts
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setStrokeColor(isDarkMode ? '#ffffff' : '#000000');

    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setStrokeColor(e.matches ? '#ffffff' : '#000000');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ColorContext.Provider value={{strokeColor}}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);
