import { Box, Button, HStack } from 'native-base';
import { useNavigate } from 'react-router-native';

import { Content } from '@app/components';

import { InfoBlock } from '../components';
import { SuccessIcon } from '../components/icons';
import { useTranslate } from '../hooks';

const PasswordRecovered = () => {
  const navigation = useNavigate();
  const t = useTranslate();

  const navigateLogin = () => navigation('/public/login');

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center">
        <InfoBlock
          title={t('titles.password_recovery')}
          subTitle={t('descriptions.password_changed')}
          icon={<SuccessIcon />}
        />
      </Box>
      <Box>
        <HStack mb="110px" justifyContent="center">
          <Button
            onPress={navigateLogin}
            py={3}
            px="30"
            bgColor="white"
            _text={{
              color: 'black',
              fontWeight: 'medium',
            }}
            _disabled={{
              bgColor: 'white',
            }}
          >
            {t('buttons.go_to_login')}
          </Button>
        </HStack>
      </Box>
    </Content>
  );
};
export default PasswordRecovered;
