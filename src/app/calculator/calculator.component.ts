import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Calculation} from "../interfaces/calculation.interface";
import {MatIconModule} from "@angular/material/icon";
import {Result} from "../interfaces/result.interface";
import {CommonModule} from "@angular/common";
import {NumPadComponent} from "../num-pad/num-pad.component";
import {Operators} from "../enums/operators.enum";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ MatIconModule, CommonModule, NumPadComponent, MatButtonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  @Input() calculation: Calculation = {firstDigit:0, secondDigit:0, operator:'addition'};
  @Input() results: Result[] = [];
  @Input() outOf: string = "";
  @Output() nextCalculation: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();


  result: number = 0;

  check(){
    switch(this.calculation.operator){
      case Operators.ADDITION:
        this.nextCalculation.emit(this.calculation.firstDigit + this.calculation.secondDigit === this.result);
        break;
      case Operators.SUBTRACTION:
        this.nextCalculation.emit(this.calculation.firstDigit - this.calculation.secondDigit === this.result);
        break;
      case Operators.MULTIPLICATION:
        this.nextCalculation.emit(this.calculation.firstDigit * this.calculation.secondDigit === this.result)
        break;
      case Operators.DIVISION:
        // TODO switch digits if second one is bigger than first
        this.nextCalculation.emit(this.calculation.firstDigit / this.calculation.secondDigit === this.result)
        break;
      default:
        this.nextCalculation.emit(this.calculation.firstDigit + this.calculation.secondDigit === this.result);
        break;

    }
    this.result = 0;
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

  addToResult($event: number){
    this.result = (this.result*10) + $event;
  }

  deleteDigit(){
    this.result = Math.floor(this.result / 10);
  }


}
