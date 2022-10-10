import { useState, useEffect } from 'react';
import { Button } from 'native-base';

import { useBackgroundTime } from '@app/hooks';
import { Timer, delay } from '@app/utils';

import { useTranslate } from '../hooks';

type Props = {
  onPress: () => unknown;
  runInitially?: boolean;
};

function SendAgainButton({ onPress, runInitially = true }: Props) {
  const [seconds, setSeconds] = useState(runInitially ? 59 : 0);
  const [timer, setTimer] = useState(() => Timer(runInitially ? 59 : 0, { onChange: setSeconds }));

  const t = useTranslate();

  useEffect(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  }, [timer]);

  useBackgroundTime({
    onActive: secondsInBackground => {
      delay(0).then(() => {
        let value = seconds - secondsInBackground;

        value = value > 0 ? value : 0;

        setSeconds(value);
        setTimer(Timer(value, { onChange: setSeconds }));
      });
    },
  });

  const buttonText = t('buttons.send_again');

  const textWithCounter = seconds
    ? `${buttonText} 0:${seconds > 9 ? '' : 0}${seconds}`
    : buttonText;

  function pressAndResetTimer() {
    onPress();
    setTimer(Timer(59, { onChange: setSeconds }));
  }

  return (
    <Button
      py={3}
      px={4}
      bgColor="white"
      _text={{
        color: 'black',
        fontWeight: 'medium',
      }}
      _disabled={{
        bgColor: 'white',
      }}
      isDisabled={Boolean(seconds)}
      onPress={pressAndResetTimer}
    >
      {textWithCounter}
    </Button>
  );
}

export default SendAgainButton;
