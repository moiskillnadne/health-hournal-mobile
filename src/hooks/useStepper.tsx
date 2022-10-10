import { useContext } from 'react';

import { StepperContext } from '@app/contexts';

function useStepper() {
  return useContext(StepperContext);
}

export default useStepper;
