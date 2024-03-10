import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSlideToggleModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Output() mathTableStarted: EventEmitter<{ index: number; random: boolean }> =
    new EventEmitter<{ index: number; random: boolean }>();
  @Output() calculationStarted: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() clubStarted: EventEmitter<number> = new EventEmitter<number>();
}
