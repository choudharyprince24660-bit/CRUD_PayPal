import { Routes } from '@angular/router';
import { CountryComponent } from './country/country';
import { PaymentComponent } from './payment/payment';

export const routes: Routes = [
  { path: '', redirectTo: 'country', pathMatch: 'full' },
  { path: 'country', component: CountryComponent },
   { path: 'payment', component: PaymentComponent }
];