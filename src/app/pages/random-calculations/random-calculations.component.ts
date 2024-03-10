import { Component } from '@angular/core';
import { Calculation } from '../../shared/interfaces/calculation.interface';
import { Operators } from '../../shared/enums/operators.enum';

import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { CalculatorComponent } from '../../shared/components/calculator/calculator.component';
import { CountdownComponent } from '../../shared/components/countdown/countdown.component';
import { MatIcon } from '@angular/material/icon';
import { ResultsComponent } from '../../shared/ui/results/results.component';
import { ModeBaseComponent } from '../../shared/components/mode-base/mode-base.component';

@Component({
  selector: 'club99-random-calculations',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    CalculatorComponent,
    CountdownComponent,
    MatIcon,
    MatIconButton,
    ResultsComponent,
  ],
  templateUrl: './random-calculations.component.html',
  styleUrl: './random-calculations.component.css',
})
export class RandomCalculationsComponent extends ModeBaseComponent {
  createCalculations(operator: string) {
    const calculations: Calculation[] = [];
    let i = 0;
    while (i < 10) {
      const { firstDigit, secondDigit } = this.getDigits(operator);

      calculations.push({ firstDigit, secondDigit, operator });
      i++;
    }
    this.calculations = calculations;
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
