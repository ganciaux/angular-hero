import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerCard } from './adventurer-card';

describe('AdventurerCard', () => {
  let component: AdventurerCard;
  let fixture: ComponentFixture<AdventurerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventurerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventurerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
