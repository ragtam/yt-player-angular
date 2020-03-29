import { TestBed } from '@angular/core/testing';

import { YtPlayerAngularService } from './yt-player-angular.service';

describe('YtPlayerAngularService', () => {
  let service: YtPlayerAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtPlayerAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
