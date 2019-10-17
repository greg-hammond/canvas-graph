import { TestBed } from '@angular/core/testing';

import { FunctionDataService } from './function-data.service';

describe('FunctionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunctionDataService = TestBed.get(FunctionDataService);
    expect(service).toBeTruthy();
  });
});
