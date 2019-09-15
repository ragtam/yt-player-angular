import * as YtPlayer from 'yt-player';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { YtPlayerFasadeModule } from '../yt-player-fasade.module';
import { StateChange } from '../models/state-change';
import { StateType } from '../models/state-type';

@Injectable({ providedIn: YtPlayerFasadeModule })
export class EventsRegistry {

    public stateChange$ = new Subject<StateChange>();

    private eventHandlers = new Map<string, (args?: any) => void>([
        ['error', (err) => this.broadcastStatusChange(StateType.Error, err)],
        ['unplayable', (videoId) => this.broadcastStatusChange(StateType.Unplayable, videoId)],
        ['unstarted', () => this.broadcastStatusChange(StateType.Unstarted)],
        ['ended', () => this.broadcastStatusChange(StateType.Ended)],
        ['playing', () => this.broadcastStatusChange(StateType.Started)],
        ['paused', () => this.broadcastStatusChange(StateType.Paused)],
        ['buffering', () => this.broadcastStatusChange(StateType.Buffering)],
        ['cued', () => this.broadcastStatusChange(StateType.Cued)],
        ['playbackQualityChange', (quality) => this.broadcastStatusChange(StateType.QualityChanged, quality)],
        ['playbackRateChange', (rate) => this.broadcastStatusChange(StateType.RateChanged, rate)],
        ['timeupdate', (time) => this.broadcastStatusChange( StateType.PlaybackProgress, time)],
    ]);

    public register(player: YtPlayer ) {
        this.eventHandlers.forEach((eventHandler, eventName) => {
            player.on(eventName, eventHandler);
        });
    }

    private broadcastStatusChange( type: StateType, payload?: any ): void {
        this.stateChange$.next({ type, payload });
    }
}
