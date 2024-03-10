import { Component } from '@angular/core';
import { Calculation } from '../../shared/interfaces/calculation.interface';
import { Operators } from '../../shared/enums/operators.enum';
import { Result } from '../../shared/interfaces/result.interface';

@Component({
  selector: 'app-random-calculations',
  standalone: true,
  imports: [],
  templateUrl: './random-calculations.component.html',
  styleUrl: './random-calculations.component.css',
})
export class RandomCalculationsComponent {
  calculations: Calculation[] = [];
  index: number = 0;
  results: Result[] = [];
  progress: number = 0;

  restart(operator: string) {
    this.index = 0;
    this.results = [];
    this.calculations = this.createCalculations(operator);
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
}
