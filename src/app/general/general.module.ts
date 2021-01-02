import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CommonMDBBootstrapModule } from '../shared/common-mdbbootstrap.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, CommonMDBBootstrapModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class GeneralModule {}