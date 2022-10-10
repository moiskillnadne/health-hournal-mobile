import { createContext } from 'react';

type SlashContext = {
  setLoadingState: (this: void, value: boolean) => any;
};

export default createContext<SlashContext>({ setLoadingState: () => {} });
