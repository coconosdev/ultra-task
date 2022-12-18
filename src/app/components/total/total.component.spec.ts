import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TotalComponent } from './total.component';
import { ProductList } from '../../types/products';
import { By } from '@angular/platform-browser';

describe('TotalComponent', () => {
  let component: TotalComponent;
  let fixture: ComponentFixture<TotalComponent>;
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
      declarations: [TotalComponent],
      imports: [StoreModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(TotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('total$ should be right', () => {
    component.total$.subscribe((total) => {
      const expectedTotal = initialState.basket.reduce(
        (acc, val) => acc + val.price,
        0
      );
      expect(total).toEqual(expectedTotal);
    });
  });

  it('total store value should display correctly in the HTML', () => {
    const { debugElement } = fixture;
    const totalElement = debugElement.query(By.css('.total-wrapper'));
    const expectedTotal = initialState.basket.reduce(
      (acc, val) => acc + val.price,
      0
    );
    const expectedValue = `Total: $${expectedTotal}.00`;
    expect(totalElement.nativeElement.innerHTML).toEqual(expectedValue);
  });
});
