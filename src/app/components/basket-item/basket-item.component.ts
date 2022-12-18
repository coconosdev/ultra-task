import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/types/products';
import { MarketStore } from 'src/app/types/store';
import { REMOVE_PRODUCT_FROM_BASKET } from 'src/app/store/basket/basket.actions';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnInit {
  constructor(private store: Store<MarketStore>) {}
  @Input()
  product!: Product;

  ngOnInit(): void {}

  removeProductFromBasket(productItem: Product) {
    this.store.dispatch(
      REMOVE_PRODUCT_FROM_BASKET({ payload: productItem.id })
    );
  }
}
