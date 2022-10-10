import { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import { useNavigate } from 'react-router-native';
import Config from 'react-native-config';

import { delay } from '@app/utils';

const { APP_LINK_URL } = Config;

const knownURLS = [APP_LINK_URL];

function extractPath(url: string) {
  const knownURL = knownURLS.find(knownURL => url.includes(knownURL)) ?? '';

  return url.replace(knownURL, '');
}

function useDeepLinking() {
  const navigate = useNavigate();

  const navigateRef = useRef(navigate);

  navigateRef.current = navigate;

  useEffect(() => {
    let current = true;

    Linking.getInitialURL().then(url => {
      if (current && url) {
        const to = extractPath(url);

        delay(0).then(() => navigateRef.current(to));
      }
    });

    return () => {
      current = false;
    };
    // Don't put "navigate" in here. There is a bug on Android that recreates "navigate" function
    // on every render after getInitialURL got called.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onURLChange(event: { url: string }) {
      navigate(extractPath(event.url));
    }

    Linking.addListener('url', onURLChange);

    return () => {
      Linking.removeAllListeners('url');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDeepLinking;
