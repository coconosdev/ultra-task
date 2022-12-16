import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './pages/basket/basket.component';
import { HeaderComponent } from './components/header/header.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { productsReducer } from './store/products/products.reducer';
import { walletReducer } from './store/wallet/wallet.reducer';
import { basketReducer } from './store/basket/basket.reducer';
import { BasketListComponent } from './components/basket-list/basket-list.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { TotalComponent } from './components/total/total.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    CheckoutComponent,
    HeaderComponent,
    ProductListComponent,
    ProductComponent,
    HomeComponent,
    BasketListComponent,
    BasketItemComponent,
    TotalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      products: productsReducer,
      wallet: walletReducer,
      basket: basketReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
