import { useEffect } from 'react';
import { isSameDay } from 'date-fns';

import { useAppSelector, useAppDispatch } from '@app/hooks';

import { selectWater, actions } from '../state';

const { waterDropped } = actions;

function useWaterDrop() {
  const { datetime } = useAppSelector(selectWater);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSameDay(datetime, Date.now())) {
      dispatch(waterDropped());
    }
  }, [datetime, dispatch]);
}

export default useWaterDrop;
