import { PlaybackQuality } from './playback-quality';
import { PlayerState } from './player-state';

export interface PlayerMethods {
    readonly destroyed: boolean;
    readonly videoId: string;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (seconds: number) => void;
    setVolume: (value: number) => void;
    getVolume: () => number;
    mute: () => void;
    unMute: () => void;
    isMuted: () => boolean;
    setSize: (width: number, height: number) => void;
    setPlaybackRate: (rate: number) => void;
    setPlaybackQuality: (sugestedQuality: PlaybackQuality) => void;
    getPlaybackRate: () => number;
    getAvailablePlaybackRates: () => number[];
    getDuration: () => number;
    getBufferingProgress: () => number;
    getState: () => PlayerState;
    getCurrentTime: () => number;
}
