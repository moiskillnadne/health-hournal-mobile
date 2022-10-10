import { useEffect, useState, useCallback } from 'react';
import Purchases, { CustomerInfo } from 'react-native-purchases';

import { useAppStateChange } from '@app/hooks';

function useCustomerInfo() {
  const [info, setInfo] = useState<Maybe<CustomerInfo>>(null);

  const getCustomerInfo = useCallback(() => Purchases.getCustomerInfo().then(setInfo), []);

  useEffect(() => {
    getCustomerInfo();
  }, [getCustomerInfo]);

  useAppStateChange({
    onActive: getCustomerInfo,
  });

  return info;
}

export default useCustomerInfo;
