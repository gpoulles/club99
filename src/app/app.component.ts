import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';
import { Calculation } from './shared/interfaces/calculation.interface';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Result } from './shared/interfaces/result.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { CountdownComponent } from './shared/components/countdown/countdown.component';
import { ResultsComponent } from './shared/ui/results/results.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    CalculatorComponent,
    CountdownComponent,
    ResultsComponent,
    CommonModule,
    MatButton,
    MatSnackBarModule,
    MatIcon,
    MatCardModule,
    MatIconButton,
    MatSlideToggleModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'math';
  calculations: Calculation[] = [];
  index: number = 0;
  results: Result[] = [];
  progress: number = 0;
  currentDuration: number = 0;

  constructor(private _snackBar: MatSnackBar) {}
}
