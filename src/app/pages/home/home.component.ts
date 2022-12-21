import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { MarketStore } from 'src/app/types/store';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products$!: Observable<ProductList>;
  productList$!: Observable<ProductList>;
  basketList$!: Observable<ProductList>;

  constructor(private store: Store<MarketStore>) {
    this.products$ = store.select('products');
    this.basketList$ = store.select('basket');
  }

  ngOnInit(): void {
    this.productList$ = combineLatest([this.products$, this.basketList$]).pipe(
      map(([products, basketList]) => {
        const basketIds = basketList.map((product) => product.id);
        const productList = products.map((product) => {
          const isOnBasket = basketIds.includes(product.id);
          return {
            ...product,
            selected: isOnBasket,
          };
        });
        return productList;
      })
    );
  }
}
