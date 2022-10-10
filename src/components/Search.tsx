import { Box, Input } from 'native-base';

import { useCommonTranslate } from '@app/hooks';

import { SearchIcon } from './icons';

type Props = {
  value: string;
  onChange: (value: string) => unknown;
};

function Search({ value, onChange }: Props) {
  const t = useCommonTranslate();

  return (
    <Box borderRadius={10}>
      <Input
        leftElement={
          <Box ml={1}>
            <SearchIcon />
          </Box>
        }
        placeholder={t('search')}
        bgColor="rgba(255, 255, 255, 0.24)"
        borderRadius={10}
        color="rgba(235, 235, 245, 0.6)"
        px={1}
        py={2}
        value={value}
        onChangeText={onChange}
        borderWidth={0}
        autoCapitalize="none"
      />
    </Box>
  );
}

export default Search;
