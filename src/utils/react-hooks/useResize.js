import { useLayoutEffect, useState } from "react";
import useResizeObserver from '@react-hook/resize-observer';

export default function useResize(target) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}
