import { TestBed } from '@angular/core/testing';

import { RuangService } from './ruang.service';

describe('RuangService', () => {
  let service: RuangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
