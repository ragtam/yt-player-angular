import { Observable } from 'rxjs';
import { PlaybackQuality } from './playback-quality';

export interface PlayerStreams {
    readonly error$: Observable<string>;
    readonly unplayable$: Observable<string>;
    readonly timeUpdate$: Observable<number>;
    readonly unstarted$: Observable<void>;
    readonly ended$: Observable<void>;
    readonly playing$: Observable<void>;
    readonly paused$: Observable<void>;
    readonly buffering$: Observable<void>;
    readonly cued$: Observable<void>;
    readonly playbackQualityChange$: Observable<PlaybackQuality>;
    readonly playbackRateChange$: Observable<number>;
}
