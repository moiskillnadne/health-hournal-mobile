import { PropsWithChildren, useEffect, memo } from 'react';
import { setLocale, addMethod, string } from 'yup';
import i18next from 'i18next';

import { setNotificationCategories } from '@features/Notifications';

import { i18nManager } from '../i18n';

function setAppLocales() {
  setLocale({
    mixed: {
      required: 'errors.this_field_is_required',
    },
    string: {
      min: 'errors.min',
      max: 'errors.format',
      matches: 'error.format',
    },
  });

  addMethod(string, 'format', function validate(regex: RegExp) {
    return this.test('isCorrectFormat', 'message', function (value, ctx) {
      const { createError } = this;
      const {
        options: { context },
      } = ctx;
      const { format } = context as { format: string };

      if (!value) return true;

      if (!value.match(regex)) {
        return createError({
          message: 'errors.expected_format',
          params: {
            format,
          },
        });
      }

      return true;
    });
  });
}

setAppLocales();

i18nManager.initialize();

type Props = PropsWithChildren<unknown>;

function LocalizationProvider({ children }: Props) {
  useEffect(() => {
    function onLanguageChange() {
      setAppLocales();
      setImmediate(setNotificationCategories);
    }

    i18next.on('languageChanged', onLanguageChange);

    return () => {
      i18next.off('languageChanged', onLanguageChange);
    };
  }, []);

  return <>{children}</>;
}

export default memo(LocalizationProvider);
