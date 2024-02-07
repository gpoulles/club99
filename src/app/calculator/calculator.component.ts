import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Calculation} from "../interfaces/calculation.interface";
import {MatIconModule} from "@angular/material/icon";
import {Result} from "../interfaces/result.interface";
import {CommonModule} from "@angular/common";
import {NumPadComponent} from "../num-pad/num-pad.component";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ MatIconModule, CommonModule, NumPadComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  @Input() calculation: Calculation | undefined;
  @Input() results: Result[] = [];
  @Output() nextCalculation: EventEmitter<boolean> = new EventEmitter<boolean>();


  result: number = 0;

  check(){
    this.nextCalculation.emit(this.result === this.calculation?.result);
    this.result = 0;
  }

  addToResult($event: number){
    this.result = (this.result*10) + $event;
  }

  deleteDigit(){
    this.result = Math.floor(this.result / 10);
  }


}
