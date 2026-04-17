import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendCard } from './legend-card';

describe('LegendCard', () => {
  let component: LegendCard;
  let fixture: ComponentFixture<LegendCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegendCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
