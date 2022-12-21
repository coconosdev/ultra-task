export type Product = {
  id: number;
  img: string | null;
  productName: string;
  price: number;
  selected: boolean;
};

export type ProductList = Product[];
