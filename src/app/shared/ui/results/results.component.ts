import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from '../../interfaces/result.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'club99-results',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  @Input() results: Result[] = [];

  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  getSuccessRate(): number {
    return Math.floor(
      (this.results.filter((x) => x.result).length / this.results.length) * 100,
    );
  }
}
