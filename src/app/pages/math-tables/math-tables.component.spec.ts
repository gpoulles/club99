import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathTablesComponent } from './math-tables.component';

describe('MathTablesComponent', () => {
  let component: MathTablesComponent;
  let fixture: ComponentFixture<MathTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathTablesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MathTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
