import slice from './slice';

export * from './api';
export * from './selectors';

export const reducers = {
  [slice.name]: slice.reducer,
};

export const { actions } = slice;

export type ModuleState = {
  [slice.name]: ReturnType<typeof slice.reducer>;
};
