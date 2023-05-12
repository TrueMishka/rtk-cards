import { AppDispatchType, RootState } from 'app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatchType
  rejectValue: unknown
}>()