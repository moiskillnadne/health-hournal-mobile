import { useEffect, useRef } from 'react';

import Purchases, { CustomerInfo } from 'react-native-purchases';

function useOnCustomerInfoChange(callback: (customerInfo: CustomerInfo) => unknown) {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    function listener(customerInfo: CustomerInfo) {
      callbackRef.current(customerInfo);
    }

    Purchases.addCustomerInfoUpdateListener(listener);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, []);
}

export default useOnCustomerInfoChange;
