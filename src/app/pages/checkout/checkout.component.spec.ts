import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CheckoutComponent } from './checkout.component';
import { ProductList } from '../../types/products';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: MockStore<{ wallet: false; basket: ProductList }>;
  const initialState = {
    wallet: 123,
    products: [
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
      {
        id: 3,
        productName: 'Fridge',
        price: 1000,
        img: 'https://contentgrid.thdstatic.com/hdus/en_US/DTCCOMNEW/fetch/NexGen/ContentPage/1Bosch-french-door-refrigerators.jpg',
      },
    ],
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
      declarations: [CheckoutComponent],
      imports: [StoreModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store>(Store);
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('firstName minlenght error should appear when value is not long enough', () => {
    component.payForm.controls['firstName'].setValue('Alf');
    const firstNameErrors =
      component.payForm.controls['firstName'].errors || {};
    expect(firstNameErrors['minlength']).toBeTruthy();
  });

  it('lastName minlenght error should appear when value is not long enough', () => {
    component.payForm.controls['lastName'].setValue('Alf');
    const lastNameErrors = component.payForm.controls['lastName'].errors || {};
    expect(lastNameErrors['minlength']).toBeTruthy();
  });

  it('street minlenght error should appear when value is not long enough', () => {
    component.payForm.controls['street'].setValue('Alf');
    const streetErrors = component.payForm.controls['street'].errors || {};
    expect(streetErrors['minlength']).toBeTruthy();
  });

  it('city minlenght error should appear when value is not long enough', () => {
    component.payForm.controls['city'].setValue('Alf');
    const cityErrors = component.payForm.controls['city'].errors || {};
    expect(cityErrors['minlength']).toBeTruthy();
  });

  it('show validate email pattern', () => {
    component.payForm.controls['email'].setValue('test');
    const errors = component.payForm.controls['email'].errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('when all data is filled, form should be valid', () => {
    component.payForm.controls['firstName'].setValue('Alfonso');
    component.payForm.controls['lastName'].setValue('Pascal');
    component.payForm.controls['street'].setValue('Victory Road');
    component.payForm.controls['city'].setValue('San Diego');
    component.payForm.controls['state'].setValue('California');
    component.payForm.controls['email'].setValue('test@test.com');
    expect(component.payForm.valid).toBeTruthy();
  });

  it('after submitting form should be reset, and successfulBuy true', () => {
    component.payForm.controls['firstName'].setValue('Alfonso');
    component.payForm.controls['lastName'].setValue('Pascal');
    component.payForm.controls['street'].setValue('Victory Road');
    component.payForm.controls['city'].setValue('San Diego');
    component.payForm.controls['state'].setValue('California');
    component.payForm.controls['email'].setValue('test@test.com');
    component.onSaveForm();
    expect(component.payForm.valid).toBeFalsy();
    expect(component.successfulBuy).toBeTruthy();
    expect(component.payForm.controls['firstName'].value).toBe(null);
    expect(component.payForm.controls['lastName'].value).toBe(null);
    expect(component.payForm.controls['street'].value).toBe(null);
    expect(component.payForm.controls['city'].value).toBe(null);
    expect(component.payForm.controls['state'].value).toBe(null);
    expect(component.payForm.controls['email'].value).toBe(null);
  });
});
