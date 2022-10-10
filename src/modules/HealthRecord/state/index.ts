import slice from './slice';

export * from './api';
export * from './slice';
export * from './selectors';

export const { actions } = slice;

export type ModuleState = {
  [slice.name]: ReturnType<typeof slice.reducer>;
};
