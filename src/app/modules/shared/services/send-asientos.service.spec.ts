import { TestBed } from '@angular/core/testing';

import { SendAsientosService } from './send-asientos.service';

describe('SendAsientosService', () => {
  let service: SendAsientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendAsientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
