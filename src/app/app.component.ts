import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {Calculation} from "./interfaces/calculation.interface";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Result} from "./interfaces/result.interface";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Operators} from "./enums/operators.enum";
import {NinetyNineClubServiceService} from "./services/ninety-nine-club.service";
import { HttpClientModule} from "@angular/common/http";
import {catchError} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {CountdownComponent} from "./countdown/countdown.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, CalculatorComponent, CountdownComponent, CommonModule, MatButton, MatSnackBarModule, HttpClientModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'math';
  calculations: Calculation[] = [];
  currentCalculation: Calculation | undefined;
  index: number = 0;
  results: Result[] =[];
  club= Array(9).fill(11).map((x,i)=>(i+1)*x);

  constructor(private _snackBar: MatSnackBar, private ninetyNineClubService: NinetyNineClubServiceService) {
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

  goBack($event: boolean){
    this.calculations = [];
    this.index = 0;
  }

  async startClub(x: number) {

    const data$ = this.ninetyNineClubService.loadData(x)
    data$.subscribe( {next:(calculations: Calculation[]) => {
      this.calculations = calculations;
      this.index = 0;
      this.results = [];
    }, error: (error) => {
        this._snackBar.open(error.message, 'Undo', {
          duration: 3000,
          verticalPosition: "top"
        });

    }});
  }

  public outOf(): string{
    return (this.index+1) + '/' + this.calculations.length;
  }

  private createCalculations(operator: string){
    let calculations: Calculation[] = [];
    let i = 0;
    while(i<10){

      const { firstDigit, secondDigit } = this.getDigits(operator);

      calculations.push({firstDigit, secondDigit, operator });
      i++;
    }
    return calculations;
  }

  private getDigits(operator: string){
    let firstDigit= Math.floor(Math.random() * 10) ;
    let secondDigit= Math.floor(Math.random() * 10) ;
    switch(operator){
      case Operators.MULTIPLICATION:
        while(firstDigit<secondDigit){
          firstDigit= Math.floor(Math.random() * 10) ;
          secondDigit= Math.floor(Math.random() * 10) ;
        }
        break;
      case Operators.DIVISION:
        // TODO: make sure that division is integer
        break;
    }
    return {firstDigit, secondDigit};
  }
}
