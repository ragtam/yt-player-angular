import * as YtPlayer from 'yt-player';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { YtPlayerFasadeModule } from '../yt-player-fasade.module';
import { PlaybackQuality } from '../playback-quality';

@Injectable({ providedIn: YtPlayerFasadeModule })
export class EventsRegistry {

    public error$ = new Subject<string>();
    public unplayable$ = new Subject<string>();
    public timeUpdate$ = new Subject<number>();
    public unstarted$ = new Subject<void>();
    public ended$ = new Subject<void>();
    public playing$ = new Subject<void>();
    public paused$ = new Subject<void>();
    public buffering$ = new Subject<void>();
    public cued$ = new Subject<void>();
    public playbackQualityChange$ = new Subject<PlaybackQuality>();
    public playbackRateChange$ = new Subject<number>();

    private eventHandlers = new Map<string, (args?: any) => void>([
        ['error', (err) => this.error$.next(err)],
        ['unplayable', (videoId) => this.unplayable$.next(videoId)],
        ['timeupdate', (time) => this.timeUpdate$.next(parseInt(`${time * 1000}`, 10))],
        ['unstarted', () => this.unstarted$.next()],
        ['ended', () => this.ended$.next()],
        ['playing', () => this.playing$.next()],
        ['paused', () => this.paused$.next()],
        ['buffering', () => this.buffering$.next()],
        ['cued', () => this.cued$.next()],
        ['playbackQualityChange', (quality) => this.playbackQualityChange$.next(quality)],
        ['playbackRateChange', (rate) => this.playbackRateChange$.next(rate)]
    ]);

    public register(player: YtPlayer ) {
        this.eventHandlers.forEach((eventHandler, eventName) => {
            player.on(eventName, eventHandler);
        });
    }
}
