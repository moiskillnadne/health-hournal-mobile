import { useEffect, useMemo } from 'react';
import { Box, Row, Divider, Pressable } from 'native-base';
import { useSearchParams, useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { noop } from '@app/utils';

import { useTranslate } from '../../hooks';
import NavHeader from '../NavHeader';
import Triglyceride from './Triglyceride';
import LdlLevel from './LdlLevel';

function CholesterolCard() {
  const t = useTranslate();
  const navigate = useNavigate();

  const isConnected = useIsConnected();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryTab = searchParams.get('cholesterol');

  const tabOptions = useMemo(
    () => [
      {
        key: 'ldl',
        title: t('titles.ldl'),
        route: LdlLevel,
      },
      {
        key: 'triglycerides',
        title: t('titles.triglycerides'),
        route: Triglyceride,
      },
    ],
    [t],
  );

  const tabOption = useMemo(
    () => tabOptions.find(option => option.key === queryTab) ?? tabOptions[0],
    [queryTab, tabOptions],
  );

  const { route: TabContent } = tabOption;

  function navigateCholesterolAnalytics() {
    navigate('/private/health-record/cholesterol_analytics', { state: { type: tabOption.key } });
  }

  useEffect(() => {
    if (!queryTab) {
      searchParams.set('cholesterol', 'ldl');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, queryTab]);

  return (
    <Box bgColor="white" rounded={4}>
      <Row py={2.5} justifyContent="space-between" divider={<Divider orientation="vertical" />}>
        {tabOptions.map(tab => (
          <NavHeader key={tab.key} name="cholesterol" value={tab.key}>
            {tab.title}
          </NavHeader>
        ))}
      </Row>

      <Pressable onPress={isConnected ? navigateCholesterolAnalytics : noop}>
        <TabContent />
      </Pressable>
    </Box>
  );
}

export default CholesterolCard;
