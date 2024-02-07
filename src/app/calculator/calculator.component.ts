import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Calculation} from "../interfaces/calculation.interface";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {Result} from "../interfaces/result.interface";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  @Input() calculation: Calculation | undefined;
  @Input() results: Result[] = [];
  @Output() nextCalculation: EventEmitter<boolean> = new EventEmitter<boolean>();

  resultControl = new FormControl<number | undefined>(undefined, [Validators.required]);
  showError = false;


  check(){
    this.nextCalculation.emit(Number(this.resultControl.value) === this.calculation?.result);
    this.resultControl.reset();
  }


}
