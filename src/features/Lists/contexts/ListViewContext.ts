import { createContext, SetStateAction, Dispatch } from 'react';

import { ListViewType } from '../types';

export const ListViewContext = createContext<ListViewType>('grid');

export const ChangeListViewContext = createContext<Dispatch<SetStateAction<ListViewType>>>(
  () => 'grid',
);
