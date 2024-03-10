import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { Calculation } from './interfaces/calculation.interface';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Result } from './interfaces/result.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Operators } from './enums/operators.enum';
import { NinetyNineClubServiceService } from './services/ninety-nine-club.service';
import { MatIcon } from '@angular/material/icon';
import { CountdownComponent } from './countdown/countdown.component';
import { ResultsComponent } from './results/results.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';

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

  constructor(
    private _snackBar: MatSnackBar,
    private ninetyNineClubService: NinetyNineClubServiceService,
  ) {}

  restart(operator: string) {
    this.index = 0;
    this.results = [];
    this.calculations = this.createCalculations(operator);
  }

  addResult($event: boolean) {
    this.results.push({
      result: $event,
      index: this.index,
      calculation: this.calculations[this.index],
      timestamp: this.currentDuration,
    });
    this.progress =
      (this.results.filter((x) => x.result).length / this.calculations.length) *
      100;

    if ($event) {
      this.index++;
      this._snackBar.open('Awesome', 'Undo', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }

    if (this.index === this.calculations.length) this.calculations = [];
  }

  reset() {
    this.calculations = [];
    this.index = 0;
    this.results = [];
    this.progress = 0;
  }

  async startClub(x: number) {
    const data$ = this.ninetyNineClubService.loadData(x);
    data$.subscribe({
      next: (calculations: Calculation[]) => {
        this.calculations = calculations;
        this.index = 0;
        this.results = [];
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Undo', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

  public outOf(): string {
    return this.index + 1 + '/' + this.calculations.length;
  }

  public setCurrentDuration($event: number) {
    this.currentDuration = $event;
  }

  private createCalculations(operator: string) {
    const calculations: Calculation[] = [];
    let i = 0;
    while (i < 10) {
      const { firstDigit, secondDigit } = this.getDigits(operator);

      calculations.push({ firstDigit, secondDigit, operator });
      i++;
    }
    return calculations;
  }

  private getDigits(operator: string) {
    let firstDigit = Math.floor(Math.random() * 10);
    let secondDigit = Math.floor(Math.random() * 10);
    switch (operator) {
      case Operators.MULTIPLICATION:
        while (firstDigit < secondDigit) {
          firstDigit = Math.floor(Math.random() * 10);
          secondDigit = Math.floor(Math.random() * 10);
        }
        break;
      case Operators.DIVISION:
        // TODO: make sure that division is integer
        break;
    }
    return { firstDigit, secondDigit };
  }

  startMathTable($event: { index: number; random: boolean }) {
    this.results = [];
    const calculations: Calculation[] = [];
    let array = Array(10)
      .fill(1)
      .map((x, i) => x + i);
    if ($event.random) array = this.shuffleArray([...array]);
    array.forEach((x) => {
      calculations.push({
        firstDigit: $event.index,
        secondDigit: x,
        operator: Operators.MULTIPLICATION,
      });
    });
    this.calculations = calculations;
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
