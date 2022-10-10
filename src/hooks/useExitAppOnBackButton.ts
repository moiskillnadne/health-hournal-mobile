import { BackHandler } from 'react-native';

import { useAndroidBackButton } from '@app/hooks';
import { showExitAlert } from '@app/utils';

function useExitAppOnBackButton() {
  useAndroidBackButton(() => {
    showExitAlert({ onConfirm: () => BackHandler.exitApp() });
  });
}

export default useExitAppOnBackButton;
