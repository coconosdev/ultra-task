import { createAction, props } from '@ngrx/store';

export const DECREMENT = createAction(
  'DECREMENT',
  props<{ payload: number }>()
);
