import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import Config from 'react-native-config';
import crashlytics from '@react-native-firebase/crashlytics';

const { REVENUE_CAT_PUBLIC_KEY_ANDROID, REVENUE_CAT_PUBLIC_KEY_IOS } = Config;

const REVENUE_CAT_PUBLIC_KEY =
  Platform.OS === 'ios' ? REVENUE_CAT_PUBLIC_KEY_IOS : REVENUE_CAT_PUBLIC_KEY_ANDROID;

crashlytics().log('REVENUE_CAT_PUBLIC_KEY_ANDROID:');
crashlytics().log(REVENUE_CAT_PUBLIC_KEY_ANDROID);

function usePurchasesSetup() {
  useEffect(() => {
    if (__DEV__) {
      Purchases.setDebugLogsEnabled(true);
    }

    crashlytics().log('REVENUE_CAT_PUBLIC_KEY:');
    crashlytics().log(REVENUE_CAT_PUBLIC_KEY);

    Purchases.configure({
      apiKey: REVENUE_CAT_PUBLIC_KEY,
    });
  }, []);
}

export default usePurchasesSetup;
