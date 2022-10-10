import { useContext, useLayoutEffect, useCallback, memo } from 'react';
import { Outlet, useNavigate } from 'react-router-native';

import { SplashContext } from '@app/contexts';
import {
  customerLogin,
  useOnCustomerInfoChange,
  isSubscribed,
  CustomerInfo,
} from '@features/Purchases';

import { selectUser } from '@app/state';
import { useAppSelector } from '@app/hooks';

function SubscriptionCheck() {
  const navigate = useNavigate();
  const { setLoadingState } = useContext(SplashContext);
  const user = useAppSelector(selectUser);

  const checkCustomerSubscription = useCallback(
    (customerInfo: CustomerInfo) => {
      if (!isSubscribed(customerInfo)) {
        navigate('/public/paywall');
      }
    },
    [navigate],
  );

  useLayoutEffect(() => {
    if (user) {
      customerLogin(user.id).then(({ customerInfo }) => {
        setLoadingState(false);
        checkCustomerSubscription(customerInfo);
      });
    }
  }, [user, checkCustomerSubscription, setLoadingState]);

  useOnCustomerInfoChange(checkCustomerSubscription);

  return <Outlet />;
}

export default memo(SubscriptionCheck);
