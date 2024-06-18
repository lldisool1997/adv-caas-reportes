import { TestBed } from '@angular/core/testing';

import { MigracionService } from './migracion.service';

describe('MigracionService', () => {
  let service: MigracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
