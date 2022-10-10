import {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-native';

import { StepperContext } from '@app/contexts';

type Props = PropsWithChildren<{
  onChangeData: (step: number, data: any) => unknown;
  onFinish: () => Promise<any>;
}>;

function Stepper({ children, onChangeData, onFinish }: Props) {
  const stepsCount = Children.count(children);

  if (!stepsCount) throw Error('[Stepper]: Child components must be defined');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onChange = useRef(onChangeData);
  const onFinishCb = useRef(onFinish);

  const [currentStep, setCurrentStep] = useState(() => {
    const step = pathname.match(/\d/)?.[0];

    return step ? +step : 0;
  });

  const isLastStep = currentStep + 1 === stepsCount;

  const progress = isLastStep ? 100 : +((currentStep + 1) / (stepsCount + 1)).toFixed(2) * 100;

  const mappedChildren =
    Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child);
      } else {
        return child;
      }
    }) ?? [];

  const changeStep = useCallback(
    (step: number) => {
      const to = pathname.replace(/\d/, step.toString());

      navigate(to);
      setCurrentStep(step);
    },
    [pathname, navigate],
  );

  const next = useCallback(
    (chunk: any, step?: number) => {
      const nextStep = step ? step : currentStep + 1;

      changeStep(nextStep);
      onChange.current(currentStep, chunk);
    },
    [changeStep, currentStep],
  );

  const back = useCallback(
    (chunk: any, step?: number) => {
      const nextStep = step ? step : currentStep - 1;

      if (nextStep <= -1) throw Error('[Stepper]: Cannot change {step}. {step} cannot be negative');

      changeStep(nextStep);
      onChange.current(currentStep, chunk);
    },
    [changeStep, currentStep],
  );

  const finish = useCallback(
    (chunk: any) => {
      onChange.current(currentStep, chunk);
      onFinishCb.current().then(() => changeStep(stepsCount - 1));
    },
    [currentStep, stepsCount, changeStep],
  );

  const change = useCallback(
    (chunk: any) => {
      onChange.current(currentStep, chunk);
    },
    [currentStep],
  );

  const stepperContext = useMemo(
    () => ({
      onNext: next,
      onBack: back,
      onFinish: finish,
      onChange: change,
      progress,
    }),
    [back, finish, next, progress, change],
  );

  useEffect(() => {
    onChange.current = onChangeData;
    onFinishCb.current = onFinish;
  });

  return (
    <StepperContext.Provider value={stepperContext}>
      <Routes>
        <Route index element={<Navigate to="step-0" replace />} />

        {mappedChildren.map((child, index) => (
          <Route key={index} path={`step-${index}`} element={child} />
        ))}
      </Routes>
    </StepperContext.Provider>
  );
}

export default Stepper;
