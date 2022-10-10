import { useRef, useEffect } from 'react';
import BaseRecaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';
import Config from 'react-native-config';

const { API_URL, RECAPTCHA_SITE_KEY } = Config;

type Props = {
  isOpen: boolean;
  onVerify: (token: string) => void;
  onExpire?: (token: string) => void;
};

function Recaptcha({ isOpen, onVerify }: Props) {
  const ref = useRef<RecaptchaHandles>(null);

  const onExpire = () => {
    console.warn('expired!');
  };

  const onError = (e: string) => {
    console.warn('error', e);
  };

  useEffect(() => {
    if (isOpen) {
      ref.current?.open();
    }
  }, [isOpen]);

  return (
    <BaseRecaptcha
      ref={ref}
      siteKey={RECAPTCHA_SITE_KEY}
      baseUrl={API_URL}
      onVerify={onVerify}
      onExpire={onExpire}
      onError={onError}
      size="normal"
    />
  );
}

export default Recaptcha;
