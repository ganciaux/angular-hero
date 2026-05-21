import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCreate } from './hero-create';

describe('HeroCreate', () => {
  let component: HeroCreate;
  let fixture: ComponentFixture<HeroCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
