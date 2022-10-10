import { LabelValue } from '@app/types';

import { IdName } from '../types';

function useSelectOptions(array?: IdName[]): LabelValue[] {
  if (array) {
    return array.map(item => ({ label: item.name, value: item.id }));
  }

  return [];
}

export default useSelectOptions;
