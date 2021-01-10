import { TestBed } from '@angular/core/testing';

import { PoolLogsService } from './pool-logs.service';

describe('PoolLogsService', () => {
  let service: PoolLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
