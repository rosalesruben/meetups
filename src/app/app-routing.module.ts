import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyMeetupsComponent } from './modules/meetups/components/my-meetups/my-meetups.component';

const routes: Routes = [
  {
    path: 'meetups',
    loadChildren: () =>
      import('./modules/meetups/meetups.module').then((m) => m.MeetupsModule),
  },
  {
    path: 'entradas',
    component: MyMeetupsComponent,
  },
  { path: '', redirectTo: 'meetups', pathMatch: 'full' },
  
  { path: 'ventas', loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule) },
  { path: 'carrito', loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
