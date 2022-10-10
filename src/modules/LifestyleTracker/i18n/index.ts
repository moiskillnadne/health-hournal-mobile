import { i18nManager } from '@app/i18n';

import enResources from './en/resources.json';
import esResources from './es/resources.json';

export function addLocalization() {
  i18nManager.addResources('en', 'LifestyleTracker', enResources);
  i18nManager.addResources('es', 'LifestyleTracker', esResources);
}
