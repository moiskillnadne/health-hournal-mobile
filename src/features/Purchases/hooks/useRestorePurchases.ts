import { useCallback } from 'react';
import Purchases from 'react-native-purchases';

function useRestorePurchases() {
  const restore = useCallback(() => {
    return Purchases.restorePurchases();
  }, []);

  return restore;
}

export default useRestorePurchases;
