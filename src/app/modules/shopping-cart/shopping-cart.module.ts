import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CommonMDBBootstrapModule } from 'src/app/shared/common-mdbbootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartItemsComponent } from './components/cart-items/cart-items.component';


@NgModule({
  declarations: [ShoppingCartComponent, AddProductComponent, CartItemsComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    CommonMDBBootstrapModule
  ]
})
export class ShoppingCartModule { }
