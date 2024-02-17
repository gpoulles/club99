import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, takeUntil} from "rxjs";
import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit, OnDestroy{
  @Input() maxDuration: number = 300000;

  destroy$: Subject<boolean> = new Subject();

  durationLabel: string = "00:00";
  currentRestDuration: number = 0;
  ngOnInit(){
    dayjs.extend(duration);
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe({next: (value)=>{this.durationLabel = this.getDuration(value)}});
  }

  getDuration(leftDuration: number){
    this.currentRestDuration = this.maxDuration-(leftDuration*1000);
    return dayjs.duration(this.currentRestDuration).format('mm:ss');
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
