import { Box, Text, Center } from 'native-base';

import { Content } from '@app/components';

import { useTranslate } from '../hooks';
import { InfoBlock, SendAgainButton } from '../components';
import { SuccessIcon } from '../components/icons';

type Props = {
  onSendAgain: () => unknown;
};

function EmailFailed({ onSendAgain }: Props) {
  const t = useTranslate();

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center" safeAreaTop>
        <InfoBlock
          title={t('titles.link_has_expired')}
          subTitle={t('descriptions.link_has_expired')}
          icon={<SuccessIcon />}
        />
      </Box>

      <Box mb="1/4">
        <Center>
          <SendAgainButton onPress={onSendAgain} runInitially={false} />

          <Text mt={5} color="white">
            {t('descriptions.if_not_receiving_email')}
          </Text>

          <Text color="white" fontWeight="medium">
            info@vitalopwellness.com
          </Text>
        </Center>
      </Box>
    </Content>
  );
}

export default EmailFailed;
