import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Calculation } from '../../interfaces/calculation.interface';
import { MatIconModule } from '@angular/material/icon';
import { Result } from '../../interfaces/result.interface';
import { CommonModule } from '@angular/common';
import { NumPadComponent } from '../../ui/num-pad/num-pad.component';
import { Operators } from '../../enums/operators.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    NumPadComponent,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  @Input() calculation: Calculation = {
    firstDigit: 0,
    secondDigit: 0,
    operator: 'addition',
  };
  @Input() results: Result[] = [];
  @Input() outOf: string = '';
  @Input() progress: number = 0;
  @Output() nextCalculation: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  result: number | undefined = undefined;

  check() {
    switch (this.calculation.operator) {
      case Operators.ADDITION:
        this.nextCalculation.emit(
          this.calculation.firstDigit + this.calculation.secondDigit ===
            this.result,
        );
        break;
      case Operators.SUBTRACTION:
        this.nextCalculation.emit(
          this.calculation.firstDigit - this.calculation.secondDigit ===
            this.result,
        );
        break;
      case Operators.MULTIPLICATION:
        this.nextCalculation.emit(
          this.calculation.firstDigit * this.calculation.secondDigit ===
            this.result,
        );
        break;
      case Operators.DIVISION:
        // TODO switch digits if second one is bigger than first
        this.nextCalculation.emit(
          this.calculation.firstDigit / this.calculation.secondDigit ===
            this.result,
        );
        break;
      default:
        this.nextCalculation.emit(
          this.calculation.firstDigit + this.calculation.secondDigit ===
            this.result,
        );
        break;
    }
    this.result = undefined;
  }

  getOperationSymbol(): string {
    switch (this.calculation.operator) {
      case Operators.ADDITION:
        return '+';
      case Operators.SUBTRACTION:
        return '-';
      case Operators.MULTIPLICATION:
        return '×'; // or '*' for simplicity
      case Operators.DIVISION:
        return '÷'; // or '/' for simplicity
      default:
        return '';
    }
  }

  addToResult($event: number) {
    if (this.result === undefined) this.result = 0;
    this.result = this.result * 10 + $event;
  }

  deleteDigit() {
    if (this.result != undefined) this.result = Math.floor(this.result / 10);
    if (this.result === 0) this.result = undefined;
  }
}
