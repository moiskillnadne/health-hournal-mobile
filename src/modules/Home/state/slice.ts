import { createSlice } from '@reduxjs/toolkit';

import { clear } from '@app/state';
import store from '@app/state/store';

const initialState = {};

const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(clear, () => {
      return initialState;
    }),
});

store.injectReducer(slice.name, slice.reducer);

export default slice;
