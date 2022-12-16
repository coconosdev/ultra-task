import { ProductList } from './products';

export type MarketStore = {
  wallet: number;
  basket: ProductList;
  products: ProductList;
};
