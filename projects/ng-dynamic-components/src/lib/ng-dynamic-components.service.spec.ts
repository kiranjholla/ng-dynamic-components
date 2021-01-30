import { TestBed } from '@angular/core/testing';

import { NgDynamicComponentsService } from './ng-dynamic-components.service';

describe('NgDynamicComponentsService', () => {
  let service: NgDynamicComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgDynamicComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
