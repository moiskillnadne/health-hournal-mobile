import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../state';

function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}

export default useAppDispatch;
