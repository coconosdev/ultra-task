import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/types/products';

export const ADD_PRODUCT_TO_BASKET = createAction(
  'ADD_PRODUCT_TO_BASKET',
  props<{ payload: Product }>()
);
export const REMOVE_PRODUCT_FROM_BASKET = createAction(
  'REMOVE_PRODUCT_FROM_BASKET',
  props<{ payload: number }>()
);
export const CLEAR_BASKET = createAction('CLEAR_BASKET');
