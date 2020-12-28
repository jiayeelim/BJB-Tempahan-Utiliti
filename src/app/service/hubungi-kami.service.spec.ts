import { TestBed } from '@angular/core/testing';

import { HubungiKamiService } from './hubungi-kami.service';

describe('HubungiKamiService', () => {
  let service: HubungiKamiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubungiKamiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
