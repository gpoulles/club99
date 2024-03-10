import { Component } from '@angular/core';
import { Calculation } from '../../interfaces/calculation.interface';
import { Result } from '../../interfaces/result.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mode-base',
  standalone: true,
  imports: [],
  templateUrl: './mode-base.component.html',
  styleUrl: './mode-base.component.css',
})
export class ModeBaseComponent {
  calculations: Calculation[] = [];
  index: number = 0;
  results: Result[] = [];
  progress: number = 0;
  currentDuration: number = 0;

  constructor(protected _snackBar: MatSnackBar) {}
  reset() {
    this.calculations = [];
    this.index = 0;
    this.results = [];
    this.progress = 0;
  }

  addResult($event: boolean) {
    this.results.push({
      result: $event,
      index: this.index,
      calculation: this.calculations[this.index],
      timestamp: this.currentDuration,
    });
    this.progress =
      (this.results.filter((x) => x.result).length / this.calculations.length) *
      100;

    if ($event) {
      this.index++;
      this._snackBar.open('Awesome', 'Undo', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }

    if (this.index === this.calculations.length) this.calculations = [];
  }

  public outOf(): string {
    return this.index + 1 + '/' + this.calculations.length;
  }

  public setCurrentDuration($event: number) {
    this.currentDuration = $event;
  }
}
