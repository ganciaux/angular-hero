import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Donjon } from './donjon';

describe('Donjon', () => {
  let component: Donjon;
  let fixture: ComponentFixture<Donjon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Donjon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Donjon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
