import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventurerList } from './adventurer-list';

describe('AdventurerList', () => {
  let component: AdventurerList;
  let fixture: ComponentFixture<AdventurerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventurerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventurerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
