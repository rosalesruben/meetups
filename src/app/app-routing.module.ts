import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'meetups',
    loadChildren: () =>
      import('./modules/meetups/meetups.module').then((m) => m.MeetupsModule),
  },
  { path: '', redirectTo: 'meetups', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
