// import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
// import { AppDispatchType, RootState } from 'app/store';
//
// export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatchType, unknown>, logic: Function) => {
//   const { rejectWithValue } = thunkAPI;
//   try {
//     return await logic();
//   } catch (e) {
//     return rejectWithValue(e);
//   }
// };

import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatchType, RootState } from "app/store";

/**
 * Обертка для Redux-Thunk, которая позволяет перехватывать и обрабатывать ошибки в сайд-эффектах.
 * @async
 * @function thunkTryCatch
 * @param {BaseThunkAPI<RootState, any, AppDispatchType, unknown>} thunkAPI - объект, содержащий методы `dispatch`, `getState`, `extra`, `rejectWithValue` для использования внутри `logic`.
 * @param {Function} logic - сайд-эффект, который необходимо выполнить в `try...catch` блоке.
 * @param {boolean} [showGlobalError=true] - флаг, указывающий, нужно ли выводить глобальную ошибку.
 * @returns {Promise<any>} результат выполнения `logic` в случае успешного выполнения, либо объект `{ e, showGlobalError }`, в случае возникновения ошибки.
 */
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatchType, unknown>,
  logic: Function,
  showGlobalError: boolean = true
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    return rejectWithValue({ e, showGlobalError });
  }
};
