import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonjonDetail } from './donjon-detail';

describe('DonjonDetail', () => {
  let component: DonjonDetail;
  let fixture: ComponentFixture<DonjonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonjonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonjonDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
