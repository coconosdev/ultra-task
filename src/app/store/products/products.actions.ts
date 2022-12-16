import { createAction, props } from '@ngrx/store';
import { Product, ProductList } from 'src/app/types/products';

export const ADD_PRODUCT = createAction(
  'ADD_PRODUCT',
  props<{ payload: Product }>()
);
export const REMOVE_PRODUCT = createAction(
  'REMOVE_PRODUCT',
  props<{ payload: number }>()
);
export const REMOVE_ARRAY_OF_PRODUCTS = createAction(
  'REMOVE_ARRAY_OF_PRODUCTS',
  props<{ payload: ProductList }>()
);
