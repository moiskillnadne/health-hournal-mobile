import slice from './slice';

export * from './selectors';
export * from './slice';

export const { actions } = slice;

export type ModuleState = {
  [slice.name]: ReturnType<typeof slice.reducer>;
};
