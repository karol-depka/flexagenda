/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterGuardService } from './router-guard.service';

describe('Service: RouterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterGuardService]
    });
  });

  it('should ...', inject([RouterGuardService], (service: RouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
