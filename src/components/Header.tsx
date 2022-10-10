import { HStack, Box, Row, IBoxProps } from 'native-base';

import { HeaderTitle } from '@app/components';

type Props = {
  title: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  renderAddons?: () => JSX.Element;
  _addonsContainer?: IBoxProps;
};

function Header({ title, leftElement, rightElement, renderAddons, _addonsContainer }: Props) {
  return (
    <HStack
      bg={{
        linearGradient: {
          colors: ['#3b2272', '#8452b0'],
          start: [0, 1],
          end: [1, 0],
        },
      }}
      w="full"
      safeAreaTop
    >
      <Box flex={1}>
        <Box py={!leftElement && !rightElement ? 5 : 2.5} px={4}>
          <Row alignItems="center" justifyContent="space-between">
            {leftElement && <Box zIndex={1}>{leftElement}</Box>}
            {title && <HeaderTitle>{title}</HeaderTitle>}
            {rightElement}
          </Row>
        </Box>

        {renderAddons && <Box {..._addonsContainer}>{renderAddons()}</Box>}
      </Box>
    </HStack>
  );
}

export default Header;
