import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {Calculation} from "./interfaces/calculation.interface";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Result} from "./interfaces/result.interface";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorComponent, CommonModule, MatButton, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'math';
  calculations: Calculation[] = [];
  currentCalculation: Calculation | undefined;
  index: number| undefined = undefined;
  results: Result[] =[];

  constructor(private _snackBar: MatSnackBar) {
  }

  restart(operator:string){
    this.index = 0;
    this.results = [];
    this.calculations = this.createCalculations(operator);
  }

  addResult($event: boolean){
    if(this.index!==undefined) {
      if($event){
        this.index++;
        this._snackBar.open('Awesome', 'Undo', {
          duration: 3000,
          verticalPosition: "top"
        });
      }

      this.results.push({result: $event, index: this.index});
    }
  }

  private createCalculations(operator: string){
    let calculations: Calculation[] = [];
    let i = 0;
    while(i<10){

      const { firstDigit, secondDigit } = this.getDigits(operator);

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

  private getDigits(operator: string){
    let firstDigit= Math.floor(Math.random() * 10) ;
    let secondDigit= Math.floor(Math.random() * 10) ;
    switch(operator){
      case "subtraction":
        while(firstDigit<secondDigit){
          firstDigit= Math.floor(Math.random() * 10) ;
          secondDigit= Math.floor(Math.random() * 10) ;
        }
        break;
      case "division":
        // TODO: make sure that division is integer
        break;
    }
    return {firstDigit, secondDigit};
  }
}
