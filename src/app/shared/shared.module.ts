import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    /* Forms imports */
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
    // TranslateModule
  ],
})
export class SharedModule {}
