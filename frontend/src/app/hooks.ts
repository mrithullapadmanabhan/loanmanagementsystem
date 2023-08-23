import { createAsyncThunk as genericCreateAsyncThunk } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useGenericDispatch,
  useSelector as useGenericSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => useGenericDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector;
export const createAsyncThunk = genericCreateAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()
