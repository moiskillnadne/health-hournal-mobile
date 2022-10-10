import { useEffect, useMemo } from 'react';
import { Box, Row, Divider, Pressable } from 'native-base';
import { useSearchParams, useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { noop } from '@app/utils';

import { useTranslate } from '../../hooks';
import NavHeader from '../NavHeader';
import FastingBloodSugar from './FastingBloodSugar';
import RandomBloodSugar from './RandomBloodSugar';
import AfterMealBloodSugar from './AfterMealBloodSugar';

function BloodSugarCard() {
  const t = useTranslate();
  const navigate = useNavigate();

  const isConnected = useIsConnected();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryTab = searchParams.get('blood-sugar');

  const tabOptions = useMemo(
    () => [
      {
        key: 'random',
        title: t('headers.random'),
        route: RandomBloodSugar,
      },
      {
        key: 'fasting',
        title: t('headers.fasting'),
        route: FastingBloodSugar,
      },
      {
        key: 'after-meal',
        title: t('headers.after_meal'),
        route: AfterMealBloodSugar,
      },
    ],
    [t],
  );

  const tabOption = useMemo(
    () => tabOptions.find(option => option.key === queryTab) ?? tabOptions[0],
    [queryTab, tabOptions],
  );

  const { route: TabContent } = tabOption;

  function navigateBloodSugarAnalytics() {
    navigate('/private/health-record/blood_sugar_analytics', { state: { type: tabOption.key } });
  }

  useEffect(() => {
    if (!queryTab) {
      searchParams.set('blood-sugar', 'random');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, queryTab]);

  return (
    <Box bgColor="white" rounded={4}>
      <Row py={2.5} justifyContent="space-between" divider={<Divider orientation="vertical" />}>
        {tabOptions.map(tab => (
          <NavHeader key={tab.key} name="blood-sugar" value={tab.key}>
            {tab.title}
          </NavHeader>
        ))}
      </Row>

      <Pressable onPress={isConnected ? navigateBloodSugarAnalytics : noop}>
        <TabContent />
      </Pressable>
    </Box>
  );
}

export default BloodSugarCard;
