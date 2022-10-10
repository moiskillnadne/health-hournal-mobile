import { useState, PropsWithChildren } from 'react';

import { ListViewType } from '../types';

import { ListViewContext, ChangeListViewContext } from '../contexts';

function ListViewProvider({ children }: PropsWithChildren<unknown>) {
  const [value, setValue] = useState<ListViewType>('grid');

  return (
    <ListViewContext.Provider value={value}>
      <ChangeListViewContext.Provider value={setValue}>{children}</ChangeListViewContext.Provider>
    </ListViewContext.Provider>
  );
}

export default ListViewProvider;
