import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MarketStore } from 'src/app/types/store';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList$!: Observable<ProductList>;

  constructor(private store: Store<MarketStore>) {
    this.productList$ = store.select('products');
  }

  ngOnInit(): void {}
}
