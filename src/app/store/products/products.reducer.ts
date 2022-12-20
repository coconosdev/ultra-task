import { createReducer, on } from '@ngrx/store';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_ARRAY_OF_PRODUCTS,
} from './products.actions';

export const initialState = [
  {
    id: 1,
    productName: 'Nike shoe',
    price: 250,
    img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2016a636-2953-41b4-b496-55263f2b26bc/air-jordan-1-mid-shoes-X5pM09.png',
  },
  {
    id: 2,
    productName: 'Puma shoe',
    price: 300,
    img: 'https://images.puma.net/images/376540/01/sv01/fnd/MEX/',
  },
  {
    id: 3,
    productName: 'Fridge',
    price: 1000,
    img: 'https://contentgrid.thdstatic.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/1Bosch-french-door-refrigerators.jpg',
  },
  {
    id: 4,
    productName: 'Roomba',
    price: 1500,
    img: 'https://www.irobotshop.mx/wp-content/uploads/2021/08/i3-_Neutral_CleanBase_Photo_Studio_LeftStanding_Hero_Phone_2000x2000.jpg',
  },
  {
    id: 5,
    productName: 'Fidget Spinner',
    price: 24,
    img: 'https://m.media-amazon.com/images/I/41Pe++KJeVL._AC_.jpg',
  },
  {
    id: 6,
    productName: 'Onion',
    price: 3,
    img: 'https://images.albertsons-media.com/is/image/ABS/184450056?$ng-ecom-pdp-mobile$&defaultImage=Not_Available',
  },
  {
    id: 7,
    productName: 'Playstation 5',
    price: 599,
    img: 'https://i.blogs.es/8fdd98/ps51/450_1000.webp',
  },
  {
    id: 8,
    productName: 'Kitchen Mittens',
    price: 15,
    img: 'https://m.media-amazon.com/images/I/71G7PCQmitL._AC_SX466_.jpg',
  },
  {
    id: 9,
    productName: 'Slice of pizza',
    price: 5,
    img: 'https://cloudfront-us-east-1.images.arcpublishing.com/tronc/AGYFLDKW7BF2ZFIBE33P7AIRTM.jpg',
  },
  {
    id: 10,
    productName: 'A hamster',
    price: 4999,
    img: 'https://t1.ea.ltmcdn.com/es/razas/1/0/5/hamster-dorado_501_0_600.jpg',
  },
];

export const productsReducer = createReducer(
  initialState,
  on(ADD_PRODUCT, (state, { payload }) => ({ ...state, payload })),
  on(REMOVE_PRODUCT, (state, { payload }) => {
    const indexToRemove = state.map((prod) => prod.id).indexOf(payload);
    return [
      ...state.slice(0, indexToRemove),
      ...state.slice(indexToRemove + 1),
    ];
  }),
  on(REMOVE_ARRAY_OF_PRODUCTS, (state, { payload }) => {
    const basketIds = payload.map((product) => product.id);

    let newState = state.filter((product) => {
      return !basketIds.includes(product.id);
    });

    return [...newState];
  })
);
