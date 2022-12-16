import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MarketStore } from 'src/app/types/store';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export class TotalComponent implements OnInit {
  basketList$!: Observable<ProductList>;
  total$!: Observable<number>;

  constructor(private store: Store<MarketStore>) {
    this.basketList$ = store.select('basket');
  }

  ngOnInit(): void {
    this.total$ = this.basketList$.pipe(
      map((basketList) => {
        const total = basketList.reduce((acc, val) => acc + val.price, 0);
        return total;
      })
    );
  }
}
