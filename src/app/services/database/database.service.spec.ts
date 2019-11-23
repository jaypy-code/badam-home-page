import { TestBed } from '@angular/core/testing';

import { Database } from './database.service';

describe('Database', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Database = TestBed.get(Database);
    expect(service).toBeTruthy();
  });
});
