import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product, ProductList } from 'src/app/types/products';
import { ADD_PRODUCT_TO_BASKET } from '../../store/basket/basket.actions';
import { MarketStore } from 'src/app/types/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<MarketStore>) {}

  @Input()
  product!: Product;

  ngOnInit(): void {}

  addProductToBasket(productItem: Product) {
    this.store.dispatch(ADD_PRODUCT_TO_BASKET({ payload: productItem }));
  }
}
