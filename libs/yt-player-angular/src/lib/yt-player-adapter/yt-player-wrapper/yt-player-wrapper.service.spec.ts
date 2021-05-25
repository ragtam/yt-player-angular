import { TestBed } from '@angular/core/testing';

import { YtPlayerWrapperService } from './yt-player-wrapper.service';

describe('YtPlayerWrapperService', () => {
  let service: YtPlayerWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtPlayerWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
