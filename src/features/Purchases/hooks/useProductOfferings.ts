import { useEffect, useState, useCallback } from 'react';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

import { useAppStateChange } from '@app/hooks';

function useProductOfferings() {
  const [offerings, setOfferings] = useState<Maybe<PurchasesOffering>>(null);

  const getOfferings = useCallback(
    () =>
      Purchases.getOfferings().then(offerings => {
        setOfferings(offerings.current);
      }),
    [],
  );

  useEffect(() => {
    getOfferings();
  }, [getOfferings]);

  useAppStateChange({
    onActive: getOfferings,
  });

  return offerings;
}

export default useProductOfferings;
