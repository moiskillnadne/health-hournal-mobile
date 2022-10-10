import { useMemo } from 'react';
import { StyledProps } from 'native-base';
import { useTranslation } from 'react-i18next';

import { KeyValue } from '@app/types';
import { Select } from '@app/components';

function LanguageSelector(props: StyledProps) {
  const { i18n, t } = useTranslation();

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  const options: KeyValue[] = useMemo(
    () => [
      { key: t('english'), value: 'en' },
      { key: t('spanish'), value: 'es' },
    ],
    [t],
  );

  return (
    <Select
      value={i18n.resolvedLanguage}
      options={options}
      onChange={changeLanguage}
      placeholder="Select language"
      {...props}
    />
  );
}

export default LanguageSelector;
