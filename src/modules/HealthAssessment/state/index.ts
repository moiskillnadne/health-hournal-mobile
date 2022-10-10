import slice from './slice';

export * from './api';
export * from './selectors';

export const { actions, getInitialState } = slice;

export type ModuleState = {
  [slice.name]: ReturnType<typeof slice.reducer>;
};
