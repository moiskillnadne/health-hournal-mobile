import Purchases, { PurchasesOffering, CustomerInfo } from 'react-native-purchases';

export const customerLogin = (userId: string) => Purchases.logIn(userId);
export const customerLogout = () => Purchases.logOut();

export const selectPrice = (offering: Maybe<PurchasesOffering>, type: 'annual' | 'monthly') =>
  offering?.[type]?.product?.priceString ?? '';

export const isSubscribed = (customerInfo: CustomerInfo) =>
  Object.entries(customerInfo.entitlements.active).length;
