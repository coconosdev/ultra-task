import { createReducer, on } from '@ngrx/store';
import { DECREMENT } from './wallet.actions';

export const initialState = 5000;

export const walletReducer = createReducer(
  initialState,
  on(DECREMENT, (state, { payload }) => state - payload)
);
