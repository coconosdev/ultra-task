import { Component, OnInit, Input } from '@angular/core';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})
export class BasketListComponent implements OnInit {
  constructor() {}
  @Input()
  basketList: ProductList | null = [];

  ngOnInit(): void {}
}
