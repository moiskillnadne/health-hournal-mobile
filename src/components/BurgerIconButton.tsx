import { useContext } from 'react';

import { DrawerNavigationContext } from '@app/contexts';

import { BurgerIcon } from './icons';

function BurgerIconButton() {
  const { open } = useContext(DrawerNavigationContext);

  return <BurgerIcon hitSlop={{ right: 40, bottom: 40, top: 40 }} onPress={open} />;
}

export default BurgerIconButton;
