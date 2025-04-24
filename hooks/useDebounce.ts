import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 250) {
  const [debouncedValue, setDebouncedVvalue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVvalue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
