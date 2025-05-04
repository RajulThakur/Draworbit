import {useEffect, useState} from 'react';

export function useSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateSize = () => {
      setSize([element.clientWidth, element.clientHeight]);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return size;
}
