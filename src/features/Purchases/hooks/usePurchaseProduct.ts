import { useCallback } from 'react';
import Purchases, { PurchasesPackage } from 'react-native-purchases';

function useProductOfferings() {
  const purchaseProduct = useCallback((product: PurchasesPackage) => {
    return Purchases.purchasePackage(product);
  }, []);

  return purchaseProduct;
}

export default useProductOfferings;
