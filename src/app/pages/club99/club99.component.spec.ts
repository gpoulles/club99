import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Club99Component } from './club99.component';

describe('Club99Component', () => {
  let component: Club99Component;
  let fixture: ComponentFixture<Club99Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Club99Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Club99Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
