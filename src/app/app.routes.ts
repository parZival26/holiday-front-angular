import { Routes } from '@angular/router';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';
import { HolidayListCountryYearComponent } from './holiday-list-country-year/holiday-list-country-year.component';

export const routes: Routes = [
  { path: '', redirectTo: '/holidays', pathMatch: 'full' },
  { path: 'holidays', component: HolidayListComponent },
  { path: 'holidays/new', component: HolidayFormComponent },
  { path: 'holidays/:id/edit', component: HolidayFormComponent },
  {
    path: 'holidays/list-year-country-year',
    component: HolidayListCountryYearComponent,
  },
  { path: '**', redirectTo: '/holidays' },
];
