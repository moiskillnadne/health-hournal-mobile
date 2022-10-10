import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Text, Button, Input } from 'native-base';

import { useCommonTranslate } from '@app/hooks';
import { AppModal } from '@app/components';

type Props = {
  isOpen: boolean;
  onSubmit: (code: string) => unknown;
  onClose: () => void;
};

function PromoCodeModal({ isOpen, onClose, onSubmit }: Props) {
  const [code, setCode] = useState('');

  const t = useCommonTranslate();

  function submit() {
    onSubmit(code);
  }

  return (
    <AppModal isOpen={isOpen} onClose={onClose} px={4} avoidKeyboard>
      <AppModal.Content px={3} py={4} bg="white" borderRadius={4} maxW="full" w="full">
        <AppModal.CloseButton />

        <AppModal.Header borderBottomWidth={0} bgColor="white" pb={0}>
          <Text fontSize={16} fontWeight={600}>
            {t('titles.add_promo_code')}
          </Text>
        </AppModal.Header>

        <AppModal.Body>
          <Input
            value={code}
            onChangeText={setCode}
            label="Promo code"
            pl={4}
            bgColor="transparent"
          />

          <Button mt="30px" onPress={submit}>
            {t('actions.add')}
          </Button>
        </AppModal.Body>
      </AppModal.Content>
    </AppModal>
  );
}

export default PromoCodeModal;
