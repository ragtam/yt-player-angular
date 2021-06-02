import { TestBed } from '@angular/core/testing';

import { YtPlayerService } from './yt-player.service';
import { EventsRegistry } from './events-registry/events-registry';

describe('YtPlayerService', () => {
  let service: YtPlayerService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ YtPlayerService, EventsRegistry ]
  }));
  beforeEach(() => service = TestBed.inject(YtPlayerService));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
