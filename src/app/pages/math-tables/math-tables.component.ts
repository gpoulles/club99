import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { Calculation } from '../../shared/interfaces/calculation.interface';
import { Operators } from '../../shared/enums/operators.enum';
import { Result } from '../../shared/interfaces/result.interface';

@Component({
  selector: 'app-math-tables',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSlideToggleModule, FormsModule],
  templateUrl: './math-tables.component.html',
  styleUrl: './math-tables.component.css',
})
export class MathTablesComponent {
  mathTables = Array(9)
    .fill(1)
    .map((x, i) => (i + 1) * x);
  randomMath = false;
  calculations: Calculation[] = [];
  results: Result[] = [];

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
