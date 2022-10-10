import { useTranslation } from 'react-i18next';

import { addLocalization } from '../i18n';

addLocalization();

function useTranslate() {
  const { t } = useTranslation('Food');

  return t;
}

export default useTranslate;
