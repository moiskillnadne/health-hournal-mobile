import { useContext } from 'react';

import { ListViewContext, ChangeListViewContext } from '../contexts';

function useListView() {
  return [useContext(ListViewContext), useContext(ChangeListViewContext)] as const;
}

export default useListView;
