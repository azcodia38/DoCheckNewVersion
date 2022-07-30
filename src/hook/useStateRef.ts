import { useRef, useState } from "react";

export function useStateRef<T>(initial_value: T): [{current: T}, (_: T) => void] {
  const [data, _setData] = useState<T>(initial_value);

  const data_ref = useRef(data);
  const setDataRef = (data: T) => {
    data_ref.current = data;
    _setData(data);
  };

  return [data_ref, setDataRef];
}
