import { TestBed } from '@angular/core/testing';

import { LogAsientosCaasService } from './log-asientos-caas.service';

describe('LogAsientosCaasService', () => {
  let service: LogAsientosCaasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogAsientosCaasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
