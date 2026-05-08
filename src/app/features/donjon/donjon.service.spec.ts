import { TestBed } from '@angular/core/testing';
import { DonjonService } from './donjon.service';

describe('DonjonService', () => {
  let service: DonjonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonjonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
