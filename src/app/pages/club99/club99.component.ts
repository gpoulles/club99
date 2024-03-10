import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Calculation } from '../../shared/interfaces/calculation.interface';
import { NinetyNineClubServiceService } from '../../shared/services/ninety-nine-club.service';
import { Result } from '../../shared/interfaces/result.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalculatorComponent } from '../../shared/components/calculator/calculator.component';
import { CountdownComponent } from '../../shared/components/countdown/countdown.component';
import { MatIcon } from '@angular/material/icon';
import { ResultsComponent } from '../../shared/ui/results/results.component';

@Component({
  selector: 'club99-club99',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    CalculatorComponent,
    CountdownComponent,
    MatIcon,
    ResultsComponent,
  ],
  templateUrl: './club99.component.html',
  styleUrl: './club99.component.css',
})
export class Club99Component {
  club = Array(9)
    .fill(11)
    .map((x, i) => (i + 1) * x);

  calculations: Calculation[] = [];
  index: number = 0;
  results: Result[] = [];
  progress: number = 0;
  currentDuration: number = 0;

  constructor(
    private readonly ninetyNineClubService: NinetyNineClubServiceService,
    private _snackBar: MatSnackBar,
  ) {}

  async startClub(x: number) {
    const data$ = this.ninetyNineClubService.loadData(x);
    data$.subscribe({
      next: (calculations: Calculation[]) => {
        this.calculations = calculations;
        this.index = 0;
        this.results = [];
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Undo', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

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
