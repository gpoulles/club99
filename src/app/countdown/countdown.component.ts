import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subject, takeUntil} from "rxjs";
import { Duration } from "luxon";

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy{
  @Input() maxDuration: number = 300000;
  @Output() duration: EventEmitter<number> = new EventEmitter<number>();
  destroy$: Subject<boolean> = new Subject();

  durationLabel: string = "00:00";
  currentRestDuration: number = 0;
  ngOnInit(){

    interval(1000).pipe(takeUntil(this.destroy$)).subscribe({next: (value)=>{this.durationLabel = this.getDuration(value)}});
  }

  getDuration(leftDuration: number){
    this.currentRestDuration = this.maxDuration-(leftDuration*1000);
    this.duration.emit(this.currentRestDuration);
    const duration = Duration.fromMillis(Math.abs(this.currentRestDuration));
    return duration.toFormat('mm:ss');
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
