import { PermissionsAndroid } from 'react-native';

import { GRANTED } from '../constants';

async function CheckFilePermissions(platform: string) {
  if (platform === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] === GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return true;
  }
}

export default CheckFilePermissions;
