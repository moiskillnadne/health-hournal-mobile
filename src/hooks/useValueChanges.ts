import { useEffect, useRef } from 'react';

type onChangeFn = <T>(currentValue: T, previousValue: T) => unknown;

const useValueChanges = <T>(value: T, onChange: onChangeFn): void => {
  const prevValue = useRef<T>(value);
  const onChangeCb = useRef(onChange);

  useEffect(() => {
    onChangeCb.current = onChange;
  });

  useEffect(() => {
    if (prevValue.current !== value) {
      onChangeCb.current(value, prevValue.current);
    }
  }, [value]);

  useEffect(() => {
    prevValue.current = value;
  });
};

export default useValueChanges;
