import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';
import { ProductList } from '../../types/products';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [StoreModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wallet store value should display correctly in the HTML', () => {
    const { debugElement } = fixture;
    const walletCount = debugElement.query(By.css('.wallet-count'));
    const expectedValue = '$123.00';
    expect(walletCount.nativeElement.innerHTML).toEqual(expectedValue);
  });

  it('basket store value should display correctly in the HTML', () => {
    const { debugElement } = fixture;
    const walletCount = debugElement.query(By.css('.basket-count'));
    const expectedValue = '(1)';
    expect(walletCount.nativeElement.innerHTML).toEqual(expectedValue);
  });
});
