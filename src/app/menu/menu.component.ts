import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import Swiper from 'swiper';
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/bundle';
@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [
      MatButtonModule,
      MatCardModule,
      MatSlideToggleModule,
      FormsModule
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements AfterViewInit{
  @Output() mathTableStarted: EventEmitter<{index: number, random: boolean}> = new EventEmitter<{index: number, random: boolean}>();
  @Output() calculationStarted: EventEmitter<string> = new EventEmitter<string>();
  @Output() clubStarted: EventEmitter<number> = new EventEmitter<number>();

  club= Array(9).fill(11).map((x,i)=>(i+1)*x);
  mathTables= Array(9).fill(1).map((x,i)=>(i+1)*x);
  randomMath = false;
  swiper: Swiper | undefined = undefined;

  ngAfterViewInit(){
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, EffectCoverflow],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }


}
