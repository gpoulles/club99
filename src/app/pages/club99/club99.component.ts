import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Calculation } from '../../shared/interfaces/calculation.interface';
import { NinetyNineClubServiceService } from '../../shared/services/ninety-nine-club.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalculatorComponent } from '../../shared/components/calculator/calculator.component';
import { CountdownComponent } from '../../shared/components/countdown/countdown.component';
import { MatIcon } from '@angular/material/icon';
import { ResultsComponent } from '../../shared/ui/results/results.component';
import { ModeBaseComponent } from '../../shared/components/mode-base/mode-base.component';

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
export class Club99Component extends ModeBaseComponent {
  club = Array(9)
    .fill(11)
    .map((x, i) => (i + 1) * x);

  constructor(
    private readonly ninetyNineClubService: NinetyNineClubServiceService,
    protected override _snackBar: MatSnackBar,
  ) {
    super(_snackBar);
  }

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
}
