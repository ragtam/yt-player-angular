import { Component, OnInit } from '@angular/core';
import { YtPlayerComponent, YtPlayerService, PlayerOptions } from 'yt-player-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  playerOptions: PlayerOptions = {
    autoplay: false,
    timeupdateFrequency: 1000
  };
  title = 'looptube';

  constructor( private ytPlayerService: YtPlayerService ) { }

  public ngOnInit(): void {
    this.ytPlayerService.timeUpdate$.subscribe(res => console.log('timeUpdate:', res));
    this.ytPlayerService.error$.subscribe(err => console.log('err', err));
    this.ytPlayerService.unplayable$.subscribe(res => console.log('unplayable', res));
    this.ytPlayerService.unstarted$.subscribe(() => console.log('unstarted'));
    this.ytPlayerService.ended$.subscribe(() => console.log('ended'));
    this.ytPlayerService.playing$.subscribe(() => console.log('playing'));
    this.ytPlayerService.paused$.subscribe(() => console.log('paused'));
    this.ytPlayerService.buffering$.subscribe(() => console.log('buffering'));
    this.ytPlayerService.cued$.subscribe(() => console.log('cued'));
    this.ytPlayerService.playbackQualityChange$.subscribe(q => console.log('quality change', q));
    this.ytPlayerService.playbackRateChange$.subscribe(res => console.log('ratechange', res));
  }

  public play(): void {
    this.ytPlayerService.play();
  }

  public pause(): void {
    this.ytPlayerService.pause();
  }

  public stop(): void {
    this.ytPlayerService.stop();
  }

  public getCurrentTime(): void {
    console.log('getCurrentTime', this.ytPlayerService.getCurrentTime());
  }

  public seek(seconds: number): void {
    this.ytPlayerService.seek(seconds);
  }

  public setVolume(volume: number): void {
    this.ytPlayerService.setVolume(volume);
  }

  public getVolume(): void {
    console.log('get volume', this.ytPlayerService.getVolume());
  }

  public mute(): void {
    this.ytPlayerService.mute();
  }

  public unMute(): void {
    this.ytPlayerService.unMute();
  }

  public isMuted(): void {
    console.log('is muted', this.ytPlayerService.isMuted());
  }

  public setSize(x: number, y: number): void {
    this.ytPlayerService.setSize(x, y);
  }

  public setPlaybackRate(rate: number): void {
    this.ytPlayerService.setPlaybackRate(rate);
  }

  public getPlaybackRate(): void {
    console.log('get playback rate', this.ytPlayerService.getPlaybackRate());
  }

  public getAvailablePlaybackRates(): void {
    console.log('get available playback rates', this.ytPlayerService.getAvailablePlaybackRates());
  }

  public getDuration(): void {
    console.log('get duration', this.ytPlayerService.getDuration());
  }

  public getProgress(): void {
    console.log('get progress', this.ytPlayerService.getProgress());
  }

  public getState(): void {
    console.log('get state', this.ytPlayerService.getState());
  }
}
