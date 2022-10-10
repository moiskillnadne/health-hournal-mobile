import { createContext } from 'react';

type StepperContext = {
  onNext: (data: any, step?: number) => unknown;
  onBack: (data: any, step?: number) => unknown;
  onFinish: (data: any) => unknown;
  onChange: (data: any) => unknown;
  progress: number;
};

export default createContext<StepperContext>({
  onBack: (data: any, step?: number) => {},
  onNext: (data: any, step?: number) => {},
  onFinish: (data: any) => {},
  onChange: (data: any) => {},
  progress: 0,
});
