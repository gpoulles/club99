import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCalculationsComponent } from './random-calculations.component';

describe('RandomCalculationsComponent', () => {
  let component: RandomCalculationsComponent;
  let fixture: ComponentFixture<RandomCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomCalculationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
