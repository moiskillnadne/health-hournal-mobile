import { Modal, Text, IModalProps, Pressable } from 'native-base';

import { CloseIcon } from './icons';

type Props = Exclude<IModalProps, 'children'> & {
  title?: string;
  body: string;
};

function InfoModal({ title, body, onClose, ...props }: Props) {
  return (
    <Modal px={4} {...props}>
      <Modal.Content px={3} py={4} bg="white" borderRadius={4} maxW="full" w="full">
        <Pressable
          position="absolute"
          right={2.5}
          top={2.5}
          zIndex={1}
          p={2}
          bg="transparent"
          borderRadius="sm"
          _hover={{
            bg: 'muted.200',
          }}
          _pressed={{
            bg: 'muted.300',
          }}
          onPress={onClose}
        >
          <CloseIcon />
        </Pressable>

        <Modal.Body>
          {title && (
            <Text fontSize="16px" fontWeight="semibold">
              {title}
            </Text>
          )}

          <Text color="gray.500" fontSize="14px" mt={2}>
            {body}
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default InfoModal;
