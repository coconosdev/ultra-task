import { Component, OnInit, Input } from '@angular/core';
import { ProductList } from 'src/app/types/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor() {}
  @Input()
  productList!: ProductList | null;

  ngOnInit(): void {}
}
