import { TestBed } from '@angular/core/testing';

import { AsientoRcService } from './asiento-rc.service';

describe('AsientoRcService', () => {
  let service: AsientoRcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientoRcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
