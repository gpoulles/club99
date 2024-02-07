import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Calculation} from "../interfaces/calculation.interface";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit {
  @Input() calculation: Calculation | undefined;
  @Output() nextCalculation: EventEmitter<boolean> = new EventEmitter<boolean>();
  result = new FormControl<number | undefined>(undefined, [Validators.required]);
  showError = false;
  ngOnInit() {

  }

  check(){
    if(Number(this.result.value) === this.calculation?.result){
      this.result.reset();
      this.nextCalculation.emit(true);
      this.showError = false;
    }else{
      this.showError = true;
    }
  }


}
