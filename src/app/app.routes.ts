import { Routes } from '@angular/router';
import { HolidayListComponent } from './components/holiday-list/holiday-list.component';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/holidays', pathMatch: 'full' },
  { path: 'holidays', component: HolidayListComponent },
  { path: 'holidays/new', component: HolidayFormComponent },
  { path: 'holidays/:id/edit', component: HolidayFormComponent },
  { path: '**', redirectTo: '/holidays' }
];
