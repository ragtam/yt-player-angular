import { YouTubePlayer, YtPlayerEvent } from '@lib/yt-player';
import { Subject } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
import { YtPlayerAdapterModule } from '../yt-player-adapter.module';
import { StateChange } from '../models/state-change';
import { StateChangeType } from '../models/state-change-type';
import { NgZone } from '@angular/core';

@Injectable({ providedIn: YtPlayerAdapterModule })
export class EventsRegistry {
    public stateChange$ = new Subject<StateChange>();

    constructor(@Optional() private ngZone: NgZone) {}

    private eventHandlers = new Map<string, (args?: any) => void>([
        [
            YtPlayerEvent.ERROR,
            (err) => this.broadcastStatusChange(StateChangeType.Error, err),
        ],
        [
            YtPlayerEvent.UNPLAYABLE,
            (videoId) =>
                this.broadcastStatusChange(StateChangeType.Unplayable, videoId),
        ],
        [
            YtPlayerEvent.UNSTARTED,
            () => this.broadcastStatusChange(StateChangeType.Unstarted),
        ],
        [
            YtPlayerEvent.ENDED,
            () => this.broadcastStatusChange(StateChangeType.Ended),
        ],
        [
            YtPlayerEvent.PLAYING,
            () => this.broadcastStatusChange(StateChangeType.Started),
        ],
        [
            YtPlayerEvent.PAUSED,
            () => this.broadcastStatusChange(StateChangeType.Paused),
        ],
        [
            YtPlayerEvent.BUFFERING,
            () => this.broadcastStatusChange(StateChangeType.Buffering),
        ],
        [
            YtPlayerEvent.CUED,
            () => this.broadcastStatusChange(StateChangeType.Cued),
        ],
        [
            YtPlayerEvent.PLAYBACK_QUALITY_CHANGE,
            (quality) =>
                this.broadcastStatusChange(
                    StateChangeType.QualityChanged,
                    quality
                ),
        ],
        [
            YtPlayerEvent.PLAYBACK_RATE_CHANGE,
            (rate) =>
                this.broadcastStatusChange(StateChangeType.RateChanged, rate),
        ],
        [
            YtPlayerEvent.TIMEUPDATE,
            (time) =>
                this.broadcastStatusChange(
                    StateChangeType.PlaybackProgress,
                    time
                ),
        ],
    ]);

    public register(player: YouTubePlayer) {
        this.eventHandlers.forEach((eventHandler, eventName) => {
            player.on(eventName, eventHandler);
        });
    }

    private broadcastStatusChange(type: StateChangeType, payload?: any): void {
        const runOutsideAngular = this.ngZone
            ? (fun) => this.ngZone.runOutsideAngular(fun)
            : (fun) => fun();
        runOutsideAngular(this.stateChange$.next({ type, payload }));
    }
}
