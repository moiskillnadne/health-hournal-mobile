import { ModuleType } from 'i18next';
import Storage from 'react-native-encrypted-storage';
import { getLocales } from 'react-native-localize';

const LANGUAGE_KEY = 'language';

function getDeviceLocale() {
  return getLocales()[0].languageCode;
}

const languageDetectorPlugin = {
  type: 'languageDetector' as ModuleType,
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      const language = await Storage.getItem(LANGUAGE_KEY);

      callback(language ? language : getDeviceLocale());
    } catch (error) {
      console.error('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      await Storage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error writing language', error);
    }
  },
};

export default languageDetectorPlugin;
