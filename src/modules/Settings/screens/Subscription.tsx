import { Linking, Platform } from 'react-native';
import { Box, Button, Text, ScrollView } from 'native-base';
import { useNavigate } from 'react-router-native';

import { Header, Content, BackArrow, H1, Logo, NotificationIconButton } from '@app/components';
import { formatDate } from '@app/utils';
import { STORE_SUBSCRIPTION_LINK } from '@app/constants';
import { useCustomerSubscription } from '@features/Purchases';

import { useTranslate } from '../hooks';

function Subscription() {
  const t = useTranslate();

  const navigate = useNavigate();
  const subscription = useCustomerSubscription();

  const isActive = subscription?.isActive;

  const latestPurchaseDate = subscription?.latestPurchaseDate;
  const expirationDate = subscription?.expirationDate;

  function cancel() {
    Linking.openURL(STORE_SUBSCRIPTION_LINK);
  }

  function renew() {
    navigate('/public/paywall');
  }

  return (
    <>
      <Box flex={1}>
        <Header
          title={t('titles.subscription')}
          leftElement={<BackArrow />}
          rightElement={<NotificationIconButton />}
        />

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <Content flex={1}>
            {isActive ? (
              <H1 my={7}>
                {t('descriptions.your_subscription_plan_active', {
                  subscription_plan: subscription.title,
                })}
              </H1>
            ) : (
              <H1 my={7}>
                {t('descriptions.your_subscription_is_not_active', { name: subscription?.title })}
              </H1>
            )}

            {latestPurchaseDate && (
              <Text color="white" mb={2.5}>
                {t('descriptions.subscription_since')} {formatDate(latestPurchaseDate)}
              </Text>
            )}

            {expirationDate && (
              <Text color="white">
                {isActive
                  ? t('descriptions.next_payment_is_on')
                  : t('descriptions.subscription_valid_until')}{' '}
                {formatDate(expirationDate)}
              </Text>
            )}
          </Content>

          <Content>
            {isActive ? (
              <Button onPress={cancel}>{t('buttons.cancel_subscription')}</Button>
            ) : (
              <Button onPress={renew}>{t('buttons.renew_subscription')}</Button>
            )}
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </>
  );
}

export default Subscription;
