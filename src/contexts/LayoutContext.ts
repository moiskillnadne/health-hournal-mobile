import { createContext } from 'react';

type Background = 'image' | 'pattern';

type LayoutContext = {
  setBackgroundType: (type: Background | ((prevType: Background) => Background)) => unknown;
};

export default createContext<LayoutContext>({ setBackgroundType: () => {} });
