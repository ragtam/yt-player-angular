import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YouTubePlayer } from '../yt-player';
import {
    PlayerMethods,
    StateChange,
    PlaybackQuality,
    PlayerState,
    PlayerOptions,
} from '../domain';
import { EventsRegistry } from './events-registry/events-registry';
import { YtPlayerWrapperService } from './yt-player-wrapper/yt-player-wrapper.service';

@Injectable({ providedIn: 'root' })
export class YtPlayerService implements PlayerMethods {
    public get stateChange$(): Observable<StateChange> {
        return this.eventsRegistry.stateChange$.asObservable();
    }
    public get destroyed(): boolean {
        return this.player.destroyed;
    }
    public get videoId(): string {
        return this.player.videoId;
    }

    private get player(): YouTubePlayer {
        return this.ytPlayer;
    }
    private set player(value: YouTubePlayer) {
        this.ytPlayer = value;
    }

    private ytPlayer: YouTubePlayer;
    private playerOptions: PlayerOptions;

    constructor(
        private ytPlayerWrapper: YtPlayerWrapperService,
        private eventsRegistry: EventsRegistry
    ) {}

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

    public seek(seconds: number): void {
        this.player.seek(seconds);
    }

    public setVolume(value: number): void {
        if (value > 100) {
            console.warn(
                `Provided value ${value} exceeds max value. 100 used instead`
            );
        }
        this.player.setVolume(value);
    }

    public getVolume(): number {
        return this.player.getVolume();
    }

    public mute(): void {
        this.player.mute();
    }
    public unMute(): void {
        this.player.unMute();
    }

    public isMuted(): boolean {
        return this.player.isMuted();
    }

    public setSize(width: number, height: number): void {
        this.player.setSize(width, height);
    }
    public setPlaybackRate(rate: number): void {
        this.player.setPlaybackRate(rate);
    }

    public setPlaybackQuality(sugestedQuality: PlaybackQuality): void {
        this.player.setPlaybackQuality(sugestedQuality);
    }
    public getPlaybackRate(): number {
        return this.player.getPlaybackRate();
    }
    public getAvailablePlaybackRates(): number[] {
        return this.player.getAvailablePlaybackRates();
    }

    public getDuration(): number {
        return this.player.getDuration();
    }
    public getBufferingProgress(): number {
        return this.player.getProgress();
    }
    public getState(): PlayerState {
        return this.player.getState();
    }

    public getCurrentTime(): number {
        return this.player.getCurrentTime();
    }
    public destroy(): void {
        this.player.destroy();
    }

    private setUpPlayer(htmlId: string, playerOptions?: PlayerOptions): void {
        this.playerOptions = playerOptions;
        this.player = this.ytPlayerWrapper.createInstance(
            htmlId,
            playerOptions
        );
    }
}
