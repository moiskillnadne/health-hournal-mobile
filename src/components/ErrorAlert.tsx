import { useState } from 'react';
import {
  Alert,
  Pressable,
  Row,
  CloseIcon,
  Text,
  StyledProps,
  Slide,
  ScrollView,
} from 'native-base';
import { SerializedError } from '@reduxjs/toolkit';

import { ApiError } from '@app/types';

type CustomError = {
  data: ApiError;
  status: number;
};

type Props = {
  error: CustomError | SerializedError | string;
} & StyledProps;

function ErrorAlert({ error, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
  }

  let message;

  if (typeof error === 'string') {
    message = error;
  } else if ('data' in error) {
    message = error.data.message;
  } else {
    message = error.message;
  }

  return (
    <Slide in={isOpen} placement="top" _android={{ px: '1px' }}>
      <Alert w="full" status="error" safeAreaTop safeAreaLeft safeAreaRight {...props}>
        <Row justifyContent="space-between" alignItems="center" w="full">
          <Row alignItems="center">
            <Alert.Icon />

            <Text fontSize="md" ml={2} color="coolGray.800" maxWidth="92%">
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

export default ErrorAlert;
