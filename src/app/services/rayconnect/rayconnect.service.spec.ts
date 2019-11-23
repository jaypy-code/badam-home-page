import { TestBed } from '@angular/core/testing';

import { RayconnectService } from './rayconnect.service';

describe('RayconnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RayconnectService = TestBed.get(RayconnectService);
    expect(service).toBeTruthy();
  });
});
