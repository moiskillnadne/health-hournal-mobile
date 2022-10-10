import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useInfiniteScroll, useFetchMedicationListQuery } from '@app/hooks';
import { AutocompleteField } from '@app/components/form';

type Props = {
  name: string;
  label: string;
  isDisabled?: boolean;
};

function MedicationAutocompleteField({ name, label, isDisabled = false }: Props) {
  const [searchText, setSearchText] = useState('');

  const { data, loadMore, refresh, isFetching } = useInfiniteScroll(useFetchMedicationListQuery, {
    take: 50,
    name: searchText,
  });

  function search(text: string) {
    setSearchText(text);
    refresh();
  }

  const debouncedSearch = useDebouncedCallback(search, 500);

  return (
    <AutocompleteField
      name={name}
      label={label}
      options={data}
      onSearch={debouncedSearch}
      loadData={loadMore}
      isLoading={isFetching}
      isDisabled={isDisabled}
    />
  );
}

export default MedicationAutocompleteField;
