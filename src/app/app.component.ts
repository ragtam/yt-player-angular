import { Component, OnInit, NgZone } from '@angular/core';
import { YtPlayerService, PlayerOptions } from 'yt-player-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public playerOptions: PlayerOptions = {
    autoplay: false,
    timeupdateFrequency: 1000
  };

  public apiMethods = [
    { action: () => this.ytPlayerService.play(), text: 'play()' },
    { action: () => this.ytPlayerService.pause(), text: 'pause()' },
    { action: () => this.ytPlayerService.stop(), text: 'stop()' },
    { action: () => console.log('getCurrentTime()', this.ytPlayerService.getCurrentTime()), text: 'getCurrentTime()' },
    { action: () => this.ytPlayerService.seek(20), text: 'seek(20)' },
    { action: () => this.ytPlayerService.setVolume(100), text: 'setVolume(100)'},
    { action: () => console.log('getVolume()', this.ytPlayerService.getVolume()), text: 'getVolume()'},
    { action: () => this.ytPlayerService.mute(), text: 'mute()' },
    { action: () => this.ytPlayerService.unMute(), text: 'unMute()' },
    { action: () => console.log('isMuted()', this.ytPlayerService.isMuted()), text: 'isMuted()' },
    { action: () => this.ytPlayerService.setSize(100, 50), text: 'setSize(100, 50)' },
    { action: () => this.ytPlayerService.setPlaybackRate(0.5), text: 'setPlaybackRate(0.5)' },
    { action: () => console.log('getPlaybackRate()', this.ytPlayerService.getPlaybackRate()), text: 'getPlaybackRate()' },
    { action: () => console.log('getAvailablePlaybackRates()',
      this.ytPlayerService.getAvailablePlaybackRates()), text: 'getAvailablePlaybackRates()' },
    { action: () => console.log('getDuration()', this.ytPlayerService.getDuration()), text: 'getDuration()' },
    { action: () => console.log('getProgress()', this.ytPlayerService.getProgress()), text: 'getProgress()' },
    { action: () => console.log('getState()', this.ytPlayerService.getState()), text: 'getState()' }
  ];

  constructor(private ytPlayerService: YtPlayerService, private ngZone: NgZone) { }

  public ngOnInit(): void {
    this.ytPlayerService.timeUpdate$.subscribe(res => console.log('timeUpdate$', res));
    this.ytPlayerService.error$.subscribe(err => console.log('err$', err));
    this.ytPlayerService.unplayable$.subscribe(res => console.log('unplayable$', res));
    this.ytPlayerService.unstarted$.subscribe(() => console.log('unstarted$'));
    this.ytPlayerService.ended$.subscribe(() => console.log('ended$'));
    this.ytPlayerService.playing$.subscribe(() => console.log('playing$'));
    this.ytPlayerService.paused$.subscribe(() => console.log('paused$'));
    this.ytPlayerService.buffering$.subscribe(() => console.log('buffering$'));
    this.ytPlayerService.cued$.subscribe(() => console.log('cued$'));
    this.ytPlayerService.playbackQualityChange$.subscribe(q => console.log('playbackQualityChange$', q));
    this.ytPlayerService.playbackRateChange$.subscribe(res => console.log('playbackRateChange$', res));
  }

  public getState(): void {
    console.log('get state', this.ytPlayerService.getState());
  }
}
