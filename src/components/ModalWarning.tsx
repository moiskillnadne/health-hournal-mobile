import { Text } from 'native-base';

import { useCommonTranslate } from '@app/hooks';

import AppModal from './AppModal';

type Props = {
  closeModal: () => void;
};

function ModalWarning({ closeModal }: Props) {
  const globalT = useCommonTranslate();

  return (
    <AppModal isOpen onClose={closeModal} px={4} avoidKeyboard>
      <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
        <AppModal.CloseButton />

        <AppModal.Header borderBottomWidth={0} bgColor="white" pb={0}>
          <Text fontSize={16} fontWeight={600}>
            {globalT('warning')}
          </Text>
        </AppModal.Header>

        <AppModal.Body pt={3}>
          <Text opacity={0.5} fontSize={14}>
            {globalT('warnings.you_have_turned_off_notifications')}
          </Text>
        </AppModal.Body>
      </AppModal.Content>
    </AppModal>
  );
}

export default ModalWarning;
