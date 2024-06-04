import { TestBed } from '@angular/core/testing';

import { AsientoRvContadoService } from './asiento-rv-contado.service';

describe('AsientoRvContadoService', () => {
  let service: AsientoRvContadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsientoRvContadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
