import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap, Observable, take } from 'rxjs';
import { MarketStore } from 'src/app/types/store';
import { CLEAR_BASKET } from 'src/app/store/basket/basket.actions';
import { REMOVE_ARRAY_OF_PRODUCTS } from 'src/app/store/products/products.actions';
import { ProductList } from 'src/app/types/products';
import { DECREMENT } from 'src/app/store/wallet/wallet.actions';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  basketList$!: Observable<ProductList>;
  payForm!: FormGroup;
  successfulBuy = false;
  emailPattern: any =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  constructor(private store: Store<MarketStore>) {
    this.basketList$ = store.select('basket');
  }
  createFormGroup() {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      city: new FormControl('', [Validators.required, Validators.minLength(5)]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
    });
  }

  ngOnInit(): void {
    this.payForm = this.createFormGroup();
  }

  onSaveForm() {
    if (this.payForm.valid) {
      this.payForm.reset();
      this.successfulBuy = true;
      this.basketList$
        .pipe(
          take(1),
          tap((basketList) => {
            const total = basketList.reduce((acc, val) => acc + val.price, 0);
            this.store.dispatch(
              REMOVE_ARRAY_OF_PRODUCTS({ payload: basketList })
            );
            this.store.dispatch(DECREMENT({ payload: total }));
            this.store.dispatch(CLEAR_BASKET());
          })
        )
        .subscribe();
    }
  }

  get firstName() {
    return this.payForm.get('firstName');
  }
  get lastName() {
    return this.payForm.get('lastName');
  }
  get street() {
    return this.payForm.get('street');
  }
  get city() {
    return this.payForm.get('city');
  }
  get state() {
    return this.payForm.get('state');
  }
  get email() {
    return this.payForm.get('email');
  }
}
