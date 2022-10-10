import { Box, VStack } from 'native-base';

import { H1, Header, Content, BackArrow } from '@app/components';

import { LanguageSelector, UnitSelector } from '../components';
import { useTranslate } from '../hooks';

function Localization() {
  const t = useTranslate();

  return (
    <Box>
      <Header title={t('titles.language_units')} leftElement={<BackArrow />} />

      <Content mt={5}>
        <VStack space={4}>
          {/* <Box>
            <H1 mb={2.5}>{t('language')}</H1>
            <LanguageSelector py="14px" px="16px" />
          </Box> */}

          <Box>
            <H1 mb={2.5}>{t('units')}</H1>
            <UnitSelector py="14px" px="16px" />
          </Box>
        </VStack>
      </Content>
    </Box>
  );
}

export default Localization;
