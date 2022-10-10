import { useMemo } from 'react';

import useCustomerInfo from './useCustomerInfo';
import useProductOfferings from './useProductOfferings';

function useCustomerSubscription() {
  const customerInfo = useCustomerInfo();
  const offerings = useProductOfferings();

  const activeSubscription = useMemo(() => {
    if (!customerInfo || !offerings) return;

    const entitlement = Object.values(customerInfo.entitlements.all)[0];

    const offering = offerings.availablePackages.find(offering => offering.product.identifier);

    return {
      ...entitlement,
      title: offering?.product.title,
    };
  }, [customerInfo, offerings]);

  return activeSubscription;
}

export default useCustomerSubscription;
