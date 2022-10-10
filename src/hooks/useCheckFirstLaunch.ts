import { useEffect, useState, useCallback } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

function useCheckFirstLaunch() {
  const [status, setStatus] = useState<boolean | undefined>(undefined);

  async function getStatus() {
    try {
      const status = await EncryptedStorage.getItem('launched');
      setStatus(status != null);
    } catch (error) {
      console.error('Error check first launch ', error);
    }
  }

  const setAppLaunched = useCallback(() => {
    EncryptedStorage.setItem('launched', 'true');
  }, []);

  useEffect(() => {
    getStatus();
  }, []);

  return { launched: status, setAppLaunched };
}

export default useCheckFirstLaunch;
