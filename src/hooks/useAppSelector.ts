import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '../state';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
