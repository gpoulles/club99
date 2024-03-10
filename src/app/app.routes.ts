import { Routes } from '@angular/router';
import { Club99Component } from './pages/club99/club99.component';
import { MathTablesComponent } from './pages/math-tables/math-tables.component';
import { RandomCalculationsComponent } from './pages/random-calculations/random-calculations.component';

export const routes: Routes = [
  { path: '', component: Club99Component },
  { path: 'math-tables', component: MathTablesComponent },
  { path: 'random-calculations', component: RandomCalculationsComponent },
];
