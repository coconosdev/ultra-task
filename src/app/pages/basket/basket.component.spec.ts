import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BasketComponent } from './basket.component';
import { ProductList } from '../../types/products';
import { combineLatest } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: MockStore<{ wallet: false; basket: ProductList }>;
  const initialState = {
    wallet: 123,
    basket: [
      {
        id: 1,
        productName: 'Nike shoe',
        price: 250,
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2016a636-2953-41b4-b496-55263f2b26bc/air-jordan-1-mid-shoes-X5pM09.png',
      },
      {
        id: 2,
        productName: 'Puma shoe',
        price: 300,
        img: 'https://images.puma.net/images/376540/01/sv01/fnd/MEX/',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      imports: [StoreModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component observables should be right', () => {
    const { basketList$, total$, canCheckout$, wallet$ } = component;
    combineLatest([basketList$, total$, canCheckout$, wallet$]).subscribe(
      ([basketList, total, canCheckout, wallet]) => {
        const expectedTotal = initialState.basket.reduce(
          (acc, val) => acc + val.price,
          0
        );
        const userCanPay = wallet >= total;
        expect(initialState.basket.length).toBe(basketList.length);
        expect(expectedTotal).toEqual(total);
        expect(userCanPay).toEqual(canCheckout);
        expect(initialState.wallet).toEqual(wallet);
      }
    );
  });

  it('should be not able to pay if the user does not have enough money', () => {
    const { debugElement } = fixture;
    const checkoutButton = debugElement.query(By.css('.button-wrapper .btn'));
    const buttonIsDisabled = checkoutButton.nativeElement.disabled;
    expect(buttonIsDisabled).toBe(true);
  });
});
