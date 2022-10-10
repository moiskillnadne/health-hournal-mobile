import { createContext } from 'react';

type ModalWarningContext = {
  openModal: () => unknown;
};

export default createContext<ModalWarningContext>({ openModal: () => {} });
