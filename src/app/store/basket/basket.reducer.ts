import { createReducer, on } from '@ngrx/store';
import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET,
  CLEAR_BASKET,
} from './basket.actions';
import { ProductList } from 'src/app/types/products';

export const initialState: ProductList = [];

export const basketReducer = createReducer(
  initialState,
  on(ADD_PRODUCT_TO_BASKET, (state, { payload }) => {
    const alreadyInBasket = state
      .map((product) => product.id)
      .includes(payload.id);
    if (alreadyInBasket) {
      return state;
    } else {
      return [...state, payload];
    }
  }),
  on(REMOVE_PRODUCT_FROM_BASKET, (state, { payload }) => {
    const indexToRemove = state.map((prod) => prod.id).indexOf(payload);
    return [
      ...state.slice(0, indexToRemove),
      ...state.slice(indexToRemove + 1),
    ];
  }),
  on(CLEAR_BASKET, (state) => [])
);
