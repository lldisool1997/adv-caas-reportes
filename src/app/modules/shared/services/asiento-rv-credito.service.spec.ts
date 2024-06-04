import { TestBed } from '@angular/core/testing';

import { AsientoRvCreditoService } from './asiento-rv-credito.service';

describe('AsientoRvCreditoService', () => {
  let service: AsientoRvCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientoRvCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
