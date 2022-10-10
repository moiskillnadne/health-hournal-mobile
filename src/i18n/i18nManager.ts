import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import languageDetectorPlugin from './languageDetectorPlugin';

import enResources from './en/resources.json';
import esResources from './es/resources.json';

const i18nManager = {
  initialize() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return i18n
      .use(initReactI18next)
      .use(languageDetectorPlugin)
      .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        resources: {
          en: {
            common: enResources,
          },
          es: {
            common: esResources,
          },
        },
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
          escapeValue: false,
        },
        debug: __DEV__,
      });
  },

  isInitialized() {
    return i18n.isInitialized;
  },

  addResources(language: string, namespace: string, resources: Record<string, any>) {
    i18n.addResourceBundle(language, namespace, resources, true);
  },
};

export default i18nManager;
