import { Box, ITextProps, Text, Row, StyledProps } from 'native-base';

import { InfoIcon } from '@app/components/icons';

type Props = {
  _body?: ITextProps;
  children: string;
} & StyledProps;

function HintBanner({ children, _body }: Props) {
  return (
    <Box bgColor="white" borderWidth={1} borderColor="#e9e9e9" borderRadius={4} py={3} px={4}>
      <Row>
        <Box mr={2.5} mt={1}>
          <InfoIcon />
        </Box>
        <Text flex={1} color="gray.500" {..._body}>
          {children}
        </Text>
      </Row>
    </Box>
  );
}

export default HintBanner;
