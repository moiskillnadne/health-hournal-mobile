import { Box, Text, IBoxProps } from 'native-base';

import { Props } from './index';

function ListTrackItem({ title, children, ...styledProps }: Pick<Props, 'title'> & IBoxProps) {
  return (
    <Box pl={4} py="12px" {...styledProps}>
      <Text>{title}</Text>

      {children}
    </Box>
  );
}

export default ListTrackItem;
