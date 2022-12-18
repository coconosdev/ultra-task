import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketListComponent } from './basket-list.component';
import { By } from '@angular/platform-browser';

describe('BasketListComponent', () => {
  let component: BasketListComponent;
  let fixture: ComponentFixture<BasketListComponent>;
  const mockBasketLit = [
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
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('basket list should render correctly', () => {
    component.basketList = mockBasketLit;
    fixture.detectChanges();
    const { debugElement } = fixture;
    const renderedBasketItems = debugElement.queryAll(
      By.css('app-basket-item')
    );
    expect(renderedBasketItems.length).toEqual(mockBasketLit.length);
  });
});
