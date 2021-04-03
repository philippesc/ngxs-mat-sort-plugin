import { TestBed } from '@angular/core/testing';

import { NgxsMatSortPluginService } from './ngxs-mat-sort-plugin.service';

describe('NgxsMatSortPluginService', () => {
  let service: NgxsMatSortPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxsMatSortPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
