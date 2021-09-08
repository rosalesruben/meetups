import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonMDBBootstrapModule } from 'src/app/shared/common-mdbbootstrap.module';


@NgModule({
  declarations: [SalesComponent, SearchProductComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,
    CommonMDBBootstrapModule
  ]
})
export class SalesModule { }
