import { Pressable } from 'native-base';
import { useFormContext } from 'react-hook-form';

import { ArrowIcon } from '@app/components/icons';
import { useAndroidBackButton, useStepper } from '@app/hooks';

function BackButton() {
  const { onBack } = useStepper();
  const { getValues } = useFormContext();

  function back() {
    onBack(getValues());
  }

  useAndroidBackButton(() => {
    back();
  });

  return (
    <Pressable onPress={back}>
      <ArrowIcon />
    </Pressable>
  );
}

export default BackButton;
