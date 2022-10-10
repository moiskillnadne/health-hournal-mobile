import { Box, Button, HStack, Center } from 'native-base';
import { useNavigate } from 'react-router-native';

import { Content } from '@app/components';

import { useTranslate } from '../hooks';
import { InfoBlock } from '../components';
import { SuccessIcon } from '../components/icons';

const EmailConfirmed = () => {
  const navigate = useNavigate();
  const t = useTranslate();

  const navigateLogin = () => {
    navigate('/public');
  };

  return (
    <Content flex={1}>
      <Box flex={1} justifyContent="center" safeAreaTop>
        <InfoBlock
          title={t('titles.email_confirmation')}
          subTitle={t('descriptions.e-mail_confirmed')}
          icon={<SuccessIcon />}
        />
      </Box>

      <Box>
        <Center mb="110px">
          <HStack justifyContent="center" mt={2}>
            <Button
              py={3}
              px={16}
              bgColor="white"
              _text={{
                color: 'black',
                fontWeight: 'medium',
              }}
              _disabled={{
                bgColor: 'white',
              }}
              onPress={navigateLogin}
            >
              {t('login')}
            </Button>
          </HStack>
        </Center>
      </Box>
    </Content>
  );
};

export default EmailConfirmed;
