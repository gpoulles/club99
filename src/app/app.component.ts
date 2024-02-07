import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {Calculation} from "./interfaces/calculation.interface";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Result} from "./interfaces/result.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorComponent, CommonModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'math';
  calculations: Calculation[] = [];
  currentCalculation: Calculation | undefined;
  index: number| undefined = undefined;
  results: Result[] =[];

  restart(operator:string){
    this.index = 0;
    this.results = [];
    this.calculations = this.createCalculations(operator);
  }

  addResult($event: boolean){
    if(this.index!==undefined) {
      if($event)  this.index++;
      console.log($event);
      console.log(this.index);
      this.results.push({result: $event, index: this.index});
    }
  }

  private createCalculations(operator: string){
    let calculations: Calculation[] = [];
    let i = 0;
    while(i<10){
      let firstDigit= Math.floor(Math.random() * 10) ;
      let secondDigit= Math.floor(Math.random() * 10) ;
      let result = 0;
      let operatorSign = '+';
      switch(operator){
        case 'addition':
          result = firstDigit + secondDigit;
          break;
        case 'subtraction':
          result = firstDigit - secondDigit;
          operatorSign = '-';
          break;
        case 'multiplication':
          result = firstDigit * secondDigit;
          operatorSign = '×';
          break;
        case 'division':
          // TODO switch digits if second one is bigger than first
          result = firstDigit / secondDigit;
          operatorSign = '÷';
          break;
        default:
          result = firstDigit + secondDigit;
          break;
      }

      calculations.push({firstDigit, secondDigit, operator: operatorSign, result });
      i++;
    }
    return calculations;
  }
}
