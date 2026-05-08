import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonjonList } from './donjon-list';

describe('DonjonList', () => {
  let component: DonjonList;
  let fixture: ComponentFixture<DonjonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonjonList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonjonList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
