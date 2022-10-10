/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PropsWithChildren } from 'react';
import { Modal, IModalProps } from 'native-base';
import { Provider } from 'react-redux';

import store from '@app/state/store';

type Props = PropsWithChildren<IModalProps>;

function AppModal({ children, ...props }: Props) {
  return (
    <Modal {...props}>
      <Provider store={store}>{children}</Provider>
    </Modal>
  );
}

AppModal.Content = Modal.Content;
AppModal.CloseButton = Modal.CloseButton;
AppModal.Header = Modal.Header;
AppModal.Footer = Modal.Footer;
AppModal.Body = Modal.Body;

export default AppModal;
