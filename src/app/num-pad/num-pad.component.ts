import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output, QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-num-pad',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './num-pad.component.html',
  styleUrl: './num-pad.component.scss'
})
export class NumPadComponent implements OnInit, AfterViewInit {
  @Output() numberTapped: EventEmitter<number> = new EventEmitter<number>();
  @Output() clear: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChildren('numButton', { read: ElementRef }) numButtons: QueryList<ElementRef> | undefined;
  @ViewChild('backSpace', { read: ElementRef }) backSpace: ElementRef | undefined;
  @ViewChild('enter', { read: ElementRef }) enter: ElementRef | undefined;

  numbers = Array(10).fill(0).map((x,i)=>i);

  constructor(private renderer: Renderer2){}

  ngOnInit(){
    const zero = this.numbers.splice(0, 1)[0];
    this.numbers.push(zero);
  }

  ngAfterViewInit() {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {

      const matchingButton = this.numButtons?.toArray().find(
        (elementRef: ElementRef) => elementRef.nativeElement.textContent.trim() === event.key
      );

      if (matchingButton) {
        matchingButton.nativeElement.click();
      }

      if(event.key === 'Backspace')
        this.backSpace?.nativeElement.click();

      if(event.key === 'Enter')
        this.enter?.nativeElement.click();

    });
  }

}
