import { useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { useStepper } from '@app/hooks';
import { deepCopy } from '@app/utils';

function usePersistOnChange<T>(watch: UseFormWatch<T>) {
  const { onChange } = useStepper();

  useEffect(() => {
    const { unsubscribe } = watch(data => {
      onChange(deepCopy(data));
    });

    return () => {
      unsubscribe();
    };
  }, [onChange, watch]);
}

export default usePersistOnChange;
