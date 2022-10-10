import { useEffect, useMemo, useRef, useState } from 'react';
import type { FlatList as FlatListType } from 'react-native';
import { Box, Text, Row, IconButton, FlatList, Spinner } from 'native-base';
import { useNavigate, Outlet, useParams, useLocation } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { Header, Content, BurgerIconButton, NotificationIconButton } from '@app/components';
import { PencilIcon, ShareIcon } from '@app/components/icons';
import { useAppSelector } from '@app/hooks';
import { selectMeasurementUnit, selectToken, selectUser } from '@app/state';
import { formatDate, delay, showConfirmCancellationWarning } from '@app/utils';

import {
  AdditionalInformationIcon,
  AppointmentIcon,
  ConditionIcon,
  MedicationIcon,
  VitalsLabsIcon,
} from '../components/icons';
import { useTranslate } from '../hooks';
import { CategoryItem, Avatar } from '../components';
import { stringifyWithCommas, sharePDF } from '../utils';

function HealthRecord() {
  const t = useTranslate();

  const flatListRef = useRef<FlatListType>();

  const [isLoading, setLoading] = useState(false);
  const isConnected = useIsConnected();

  const navigate = useNavigate();

  const { '*': params = 'medications' } = useParams();

  const { pathname } = useLocation();

  const user = useAppSelector(selectUser);

  const token = useAppSelector(selectToken) as string;

  const unit = useAppSelector(selectMeasurementUnit);

  const data = useMemo(
    () => [
      {
        key: 'medications',
        title: t('titles.my_medications'),
        Icon: MedicationIcon,
      },
      {
        key: 'vitals',
        title: t('titles.vitals_labs'),
        Icon: VitalsLabsIcon,
      },
      {
        key: 'conditions',
        title: t('titles.conditions'),
        Icon: ConditionIcon,
      },
      {
        key: 'doctor_visits',
        title: t('titles.doctor_visits_procedures'),
        Icon: AppointmentIcon,
      },
      {
        key: 'additional_information',
        title: t('titles.additional_information'),
        Icon: AdditionalInformationIcon,
      },
    ],
    [t],
  );

  function showWarning() {
    showConfirmCancellationWarning({
      message: t('warnings.share_health_info'),
      onConfirm: () => {
        setLoading(true);

        sharePDF({ token, unit: unit.toUpperCase() }).finally(() => setLoading(false));
      },
    });
  }

  function navigateAccountDetails() {
    navigate('/private/settings/account-details');
  }

  function onScrollToIndexFailed(info: { index: number }) {
    delay(500).then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    });
  }

  function scrollToItem(index: number) {
    return flatListRef?.current?.scrollToIndex({ index, animated: true });
  }

  useEffect(() => {
    if (params) {
      const index = data.findIndex(item => pathname.includes(item.key));
      if (index >= 0) scrollToItem(index);
    }
  }, [params, data, pathname]);

  return (
    <Box flex={1}>
      <Header
        title={t('titles.health_record')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <Box bg="white" py={2.5}>
        <Content>
          <Row alignItems="center" justifyContent="space-between" mb={5}>
            <Box flex={1}>
              <Row alignItems="center">
                <Avatar firstName={user?.firstName} />

                <Box maxWidth={'70%'}>
                  <Text color="black" fontWeight={600}>
                    {user?.firstName} {user?.lastName}
                  </Text>

                  {user && <Text>{formatDate(user.dateOfBirth)}</Text>}

                  <Text numberOfLines={1}>
                    {stringifyWithCommas([user?.city, user?.state, user?.country])}
                  </Text>
                </Box>
              </Row>
            </Box>

            <Row space={4}>
              <PencilIcon
                fill={isConnected ? '#9B57D3' : '#C1C1C1'}
                onPress={isConnected ? navigateAccountDetails : undefined}
              />

              {isLoading ? (
                <Spinner />
              ) : (
                <ShareIcon
                  fill={isConnected ? '#9B57D3' : '#C1C1C1'}
                  onPress={isConnected ? showWarning : undefined}
                />
              )}
            </Row>
          </Row>

          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.key}
            initialScrollIndex={0}
            onScrollToIndexFailed={onScrollToIndexFailed}
            ItemSeparatorComponent={() => <Box w={1} />}
            renderItem={({ item }) => <CategoryItem item={item} />}
          />
        </Content>
      </Box>

      <Outlet />
    </Box>
  );
}

export default HealthRecord;
