import { PropsWithChildren, memo, useMemo } from 'react';

import { ModalWarningContext } from '@app/contexts';
import { useModal } from '@app/hooks';
import { ModalWarning } from '@app/components';

type Props = PropsWithChildren<unknown>;

function ModalWarningProvider({ children }: Props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const value = useMemo(
    () => ({
      openModal,
    }),
    [openModal],
  );

  return (
    <ModalWarningContext.Provider value={value}>
      {isModalOpen ? <ModalWarning closeModal={closeModal} /> : null}
      {children}
    </ModalWarningContext.Provider>
  );
}

export default memo(ModalWarningProvider);
