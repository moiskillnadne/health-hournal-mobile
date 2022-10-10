import { useState } from 'react';
import { Alert, Pressable, Row, CloseIcon, Text, StyledProps, Slide } from 'native-base';

type Props = {
  message: string;
} & StyledProps;

function SuccessAlert({ message }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
  }

  return (
    <Slide in={isOpen} placement="top" _android={{ px: '1px' }}>
      <Alert w="full" status="success" safeAreaTop safeAreaLeft safeAreaRight>
        <Row justifyContent="space-between" alignItems="center" w="full">
          <Row alignItems="center">
            <Alert.Icon />

            <Text fontSize="md" ml={2} color="coolGray.800">
              {message}
            </Text>
          </Row>

          <Pressable onPress={close} hitSlop={40}>
            <CloseIcon size="3" color="coolGray.600" />
          </Pressable>
        </Row>
      </Alert>
    </Slide>
  );
}

export default SuccessAlert;
