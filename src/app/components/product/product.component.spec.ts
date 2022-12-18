import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProductComponent } from './product.component';
import { ProductList } from '../../types/products';
import { By } from '@angular/platform-browser';
import { ADD_PRODUCT_TO_BASKET } from 'src/app/store/basket/basket.actions';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let store: MockStore<{ wallet: false; basket: ProductList }>;
  const mockProduct = {
    id: 1,
    productName: 'Nike shoe',
    price: 250,
    img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2016a636-2953-41b4-b496-55263f2b26bc/air-jordan-1-mid-shoes-X5pM09.png',
  };
  const initialState = {
    wallet: 123,
    basket: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [StoreModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly the product data', () => {
    const { debugElement } = fixture;
    const productName = debugElement.query(By.css('.product .card-title'));
    const productPrice = debugElement.query(By.css('.product .card-text'));
    const expectedProductName = mockProduct.productName;
    const expectedProductPrice = `$${mockProduct.price}.00`;
    expect(productName.nativeElement.innerHTML).toEqual(expectedProductName);
    expect(productPrice.nativeElement.innerHTML).toEqual(expectedProductPrice);
  });

  it('dispatch function should be called when using calling addProductToBasket', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.addProductToBasket(mockProduct);
    expect(dispatchSpy).toHaveBeenCalledWith(
      ADD_PRODUCT_TO_BASKET({ payload: mockProduct })
    );
  });
});
