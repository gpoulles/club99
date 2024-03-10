import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeBaseComponent } from './mode-base.component';

describe('ModeBaseComponent', () => {
  let component: ModeBaseComponent;
  let fixture: ComponentFixture<ModeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
