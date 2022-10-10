import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldError } from 'react-hook-form';

import { ValidationError } from '../types';

type Props = PropsWithChildren<{
  error: string | FieldError;
}>;

function ErrorMessage({ error }: Props) {
  const { t } = useTranslation();

  if (!error) return null;

  if (typeof error === 'string') {
    return <>{error}</>;
  } else {
    const e = error as ValidationError;

    return <>{t(e.message, e.params)}</>;
  }
}

export default ErrorMessage;
