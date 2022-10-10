import { useTranslation } from 'react-i18next';

function useTranslate() {
  const { t } = useTranslation('common');

  return t;
}

export default useTranslate;
