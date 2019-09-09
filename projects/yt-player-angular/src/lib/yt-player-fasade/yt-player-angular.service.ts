import { Injectable } from '@angular/core';
import * as YtPlayer from 'yt-player';
import { Observable, Subject } from 'rxjs';
import { PlayerOptions } from '../player-options';
import { YtPlayerFasadeModule } from './yt-player-fasade.module';
import { EventsRegistry } from './events-registry/events-registry';
import { PlaybackQuality } from './playback-quality';
import { PlayerState } from './player-state';

@Injectable({ providedIn: YtPlayerFasadeModule })
export class YtPlayerService {

  public get error$(): Observable<string> { return this.eventsRegistry.error$; }
  public get unplayable(): Observable<string> { return this.eventsRegistry.unplayable$; }
  public get timeUpdate$(): Observable<number> { return this.eventsRegistry.timeUpdate$; }
  public get unstarted$(): Observable<void> { return this.eventsRegistry.unstarted$; }
  public get ended$(): Observable<void> { return this.eventsRegistry.ended$; }
  public get playing$(): Observable<void> { return this.eventsRegistry.playing$; }
  public get paused$(): Observable<void> { return this.eventsRegistry.paused$; }
  public get buffering$(): Observable<void> { return this.eventsRegistry.buffering$; }
  public get cued$(): Observable<void> { return this.eventsRegistry.cued$; }
  public get playbackQualityChange$(): Observable<PlaybackQuality> { return this.eventsRegistry.playbackQualityChange$; }
  public get playbackRateChange$(): Observable<number> { return this.eventsRegistry.playbackRateChange$; }
  public get destroyed(): boolean { return this.player.destroyed; }
  public get videoId(): string { return this.player.videoId; }

  private get player(): YtPlayer { this.validatePlayer(); return this.ytPlayer; }
  private set player(value: YtPlayer) { this.ytPlayer = value; }

  private ytPlayer: YtPlayer;
  private playerOptions: PlayerOptions;

  constructor( private eventsRegistry: EventsRegistry ) { }

  public init(htmlId: string, playerOptions?: PlayerOptions): void {
    this.setUpPlayer(htmlId, playerOptions);
    this.eventsRegistry.register(this.player);
  }

  public load(videoId: string): void {
    const autoplay = this.playerOptions && this.playerOptions.autoplay;
    this.player.load(videoId, autoplay);
  }

  public play(): void {
    this.player.play();
  }

  public pause(): void {
    this.player.pause();
  }

  public stop(): void {
    this.player.stop();
  }

  public getCurrentTime(): number {
    return this.player.getCurrentTime();
  }

  public seek(seconds: number): void {
    this.player.seek(seconds);
  }

  public setVolume(value: number): void {
    if (value > 100) {
      console.warn(`Provided value ${value} exceeds max value. 100 used instead`);
    }
    this.player.setVolume();
  }

  public getVolume(): number {
    return this.player.getVolume();
  }

  public mute(): void {
    this.player.getVolume();
  }
​
  public unMute(): void {
    this.player.unMute();
  }

  public isMuted(): boolean {
    return this.player.isMuted();
  }

  public setSize(width: number, height: number): void {
    this.player.setSize(width, height);
  }
​
  public setPlaybackRate(rate: number): void {
    this.player.setPlaybackRate(rate);
  }
​
  public getPlaybackRate(): number {
    return this.player.getPlaybackRate();
  }
​
  public getAvailablePlaybackRates(): number[] {
    return this.getAvailablePlaybackRates();
  }

  public getDuration(): number {
    return this.getDuration();
  }
​
  public getProgress(): number {
    return this.player.getProgress();
  }
​
  public getState(): PlayerState {
    return this.player.getState();
  }
​​
  public destroy(): void {
    this.player.destroy();
  }

  private setUpPlayer(htmlId: string, playerOptions?: PlayerOptions): void {
    this.playerOptions = playerOptions;
    this.player = new YtPlayer(htmlId, playerOptions);
  }

  private validatePlayer(): void {
    if (!this.player) {
      throw new Error('Player has not been initialized');
    }
  }
}
