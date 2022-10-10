import { createContext } from 'react';

type DrawerNavigationContext = {
  open: () => unknown;
};

export default createContext<DrawerNavigationContext>({ open: () => {} });
