import { Component, OnInit } from '@angular/core';
import { map, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { MarketStore } from 'src/app/types/store';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basketList$!: Observable<ProductList>;
  total$!: Observable<number>;
  canCheckout$!: Observable<boolean>;
  wallet$!: Observable<number>;

  constructor(private store: Store<MarketStore>) {
    this.basketList$ = store.select('basket');
    this.wallet$ = store.select('wallet');
  }

  ngOnInit(): void {
    this.total$ = this.basketList$.pipe(
      map((basketList) => {
        const total = basketList.reduce((acc, val) => acc + val.price, 0);
        return total;
      })
    );

    this.canCheckout$ = combineLatest([this.total$, this.wallet$]).pipe(
      map(([total, wallet]) => {
        return wallet >= total;
      })
    );
  }
}
