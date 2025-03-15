import { TestBed } from '@angular/core/testing';

import { RecuerdosService } from './recuerdos.service';

describe('RecuerdosService', () => {
  let service: RecuerdosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuerdosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
