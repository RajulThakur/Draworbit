import {useEffect, useState} from 'react';

export function useRenderLoop(interval: number = 100) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return frame;
}
