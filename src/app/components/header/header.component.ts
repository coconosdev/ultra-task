import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductList } from 'src/app/types/products';
import { MarketStore } from 'src/app/types/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  count$!: Observable<number>;
  basketCount$!: Observable<ProductList>;

  constructor(private store: Store<MarketStore>) {
    this.count$ = store.select('wallet');
    this.basketCount$ = store.select('basket');
  }

  ngOnInit(): void {}
}
