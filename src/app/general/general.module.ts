import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CommonMDBBootstrapModule } from '../shared/common-mdbbootstrap.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterComponent } from './register/register.component';
import { HeaderKioskoComponent } from './header-kiosko/header-kiosko.component';
import { FooterKioskoComponent } from './footer-kiosko/footer-kiosko.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoginComponent, LoginModalComponent, RegisterComponent, HeaderKioskoComponent, FooterKioskoComponent],
  imports: [SharedModule, CommonMDBBootstrapModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, HeaderKioskoComponent, FooterKioskoComponent],
})
export class GeneralModule { }
