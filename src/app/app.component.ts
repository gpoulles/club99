import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalculatorComponent} from "./calculator/calculator.component";
import {Calculation} from "./interfaces/calculation.interface";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorComponent, CommonModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'math';
  calculations: Calculation[] = [];
  currentCalculation: Calculation | undefined;
  index = 0;
  ngOnInit(){
    this.calculations = this.createCalculations();
  }

  restart(){
    this.index = 0;
  }

  private createCalculations(){
    let calculations: Calculation[] = [];
    let i = 0;
    while(i<10){
      const firstDigit= Math.floor(Math.random() * 10) ;
      const secondDigit= Math.floor(Math.random() * 10) ;
      const result = firstDigit + secondDigit;
      calculations.push({firstDigit, secondDigit, operator: '+', result });
      i++;
    }
    return calculations;
  }
}
