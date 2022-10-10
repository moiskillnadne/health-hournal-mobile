import { useMemo, useState } from 'react';
import { Linking, Platform } from 'react-native';
import {
  Column,
  Button,
  ScrollView,
  Box,
  Text,
  Pressable,
  IPressableProps,
  Center,
} from 'native-base';
import { useNavigate } from 'react-router-native';
import { skipToken } from '@reduxjs/toolkit/query/react';

import {
  H1,
  Logo,
  Content,
  Header,
  PolicyModal,
  TermsOfUseModal,
  InfoModal,
  ErrorAlert,
  Loader,
} from '@app/components';
import { ArrowIcon } from '@app/components/icons';

import {
  PurchasesPackage,
  useRestorePurchases,
  useProductOfferings,
  usePurchaseProduct,
  customerLogout,
  PurchasePackage,
  PromoCodeModal,
} from '@features/Purchases';

import { useCommonTranslate, useFetchAppStoreIdQuery } from '../hooks';
import { CONTACT_EMAIL } from '../constants';

function Paywall() {
  const t = useCommonTranslate();

  const [promoCodeModalOpen, setPromoCodeModalOpen] = useState(false);
  const [policyModalOpened, setPolicyModalOpened] = useState(false);
  const [termsOfUserModalOpened, setTermsOfUserModalOpened] = useState(false);
  const [instructionOpened, setInstructionOpened] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isLoading, setIslLoading] = useState(false);

  const navigate = useNavigate();
  const restore = useRestorePurchases();
  const productOfferings = useProductOfferings();
  const purchaseProduct = usePurchaseProduct();
  const { data: appStoreData } = useFetchAppStoreIdQuery(
    Platform.OS === 'android' ? skipToken : undefined,
  );

  const appStoreId = appStoreData?.appStoreId;

  const productOfferingList = useMemo(
    () => (productOfferings ? productOfferings.availablePackages : []),
    [productOfferings],
  );

  function navigatePrivate() {
    navigate('/private');
  }

  function navigateLogin() {
    customerLogout();
    navigate('/public');
  }

  function choosePlan(purchasesPackage: PurchasePackage) {
    resetError();

    setIslLoading(true);

    purchaseProduct(purchasesPackage)
      .then(navigatePrivate)
      .catch((error: Error) => setErrorText(error.message))
      .finally(() => setIslLoading(false));
  }

  function restoreSubscription() {
    resetError();

    restore()
      .then(navigatePrivate)
      .catch((error: Error) => setErrorText(error.message));
  }

  function redeemCode() {
    if (Platform.OS === 'android') {
      setInstructionOpened(true);
    } else {
      setPromoCodeModalOpen(true);
    }
  }

  function onPromoCodeSubmit(code: string) {
    if (appStoreId) {
      Linking.openURL(`https://apps.apple.com/redeem?ctx=offercodes&id=${appStoreId}&code=${code}`);
    }
    closePromoCodeModal();
  }

  function openPolicyModal() {
    setPolicyModalOpened(true);
  }

  function openTermsOfUseModal() {
    setTermsOfUserModalOpened(true);
  }

  function closePolicyModal() {
    setPolicyModalOpened(false);
  }

  function closeTermsOfUseModal() {
    setTermsOfUserModalOpened(false);
  }

  function navigateEmail() {
    Linking.openURL(`mailto:${CONTACT_EMAIL}`);
  }

  function closeInstructions() {
    setInstructionOpened(false);
  }

  function closePromoCodeModal() {
    setPromoCodeModalOpen(false);
  }

  function resetError() {
    setErrorText('');
  }

  return (
    <>
      <Box flex={1}>
        <Header
          leftElement={<ArrowIcon onPress={navigateLogin} />}
          title={t('titles.subscription_plans')}
        />

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <Content flex={1} mt="30px">
            <H1>{t('titles.select_your_subscription')}</H1>

            <Column space={2.5} mt={5}>
              {productOfferingList.map(offering => (
                <PurchasesPackage
                  key={offering.identifier}
                  price={offering.product.priceString}
                  packageName={offering.product.title}
                  onPress={() => choosePlan(offering)}
                  purchasePackage={offering}
                />
              ))}
            </Column>

            <Button my="30px" onPress={redeemCode}>
              {t('actions.redeem_code')}
            </Button>
          </Content>

          <Column justifyContent="space-between" alignItems="center">
            <Button
              onPress={restoreSubscription}
              bgColor="white"
              py={2.5}
              px={6}
              _text={{
                color: 'black',
                fontWeight: 'medium',
              }}
            >
              {t('actions.restore_subscription')}
            </Button>

            <Column mt={6} alignItems="center" space={2.5}>
              <LinkButton onPress={openPolicyModal}>{t('actions.privacy_policy')}</LinkButton>
              <LinkButton onPress={openTermsOfUseModal}>{t('actions.terms_of_use')}</LinkButton>
              <LinkButton onPress={navigateEmail}>{t('actions.contact_us')}</LinkButton>
            </Column>

            <Logo />
          </Column>
        </ScrollView>

        {isLoading && (
          <Center position="absolute" w="full" h="full" opacity={0.5} bgColor="white">
            <Loader />
          </Center>
        )}
      </Box>

      <PolicyModal isOpen={policyModalOpened} onClose={closePolicyModal} />
      <TermsOfUseModal isOpen={termsOfUserModalOpened} onClose={closeTermsOfUseModal} />

      <InfoModal
        isOpen={instructionOpened}
        onClose={closeInstructions}
        body={t('descriptions.android_redeem_code')}
      />

      {errorText ? <ErrorAlert error={errorText} /> : null}

      <PromoCodeModal
        isOpen={promoCodeModalOpen}
        onSubmit={onPromoCodeSubmit}
        onClose={closePromoCodeModal}
      />
    </>
  );
}

function LinkButton({ children, ...props }: IPressableProps) {
  return (
    <Pressable {...props}>
      <Text color="white" fontWeight="medium" underline fontSize="md">
        {children}
      </Text>
    </Pressable>
  );
}

export default Paywall;
