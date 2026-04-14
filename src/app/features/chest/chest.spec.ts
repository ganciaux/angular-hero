import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chest } from './chest';

describe('Chest', () => {
  let component: Chest;
  let fixture: ComponentFixture<Chest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
