import { PlaybackQuality } from '../models/playback-quality';

const m = new Map();

export class YouTubePlayerMock {
    // event: string | symbol, listener: (...args: any[]) => void
    public on(type: string, listener: any): this {
        m.set(type, listener);
        return this;
    }

    public fireEvent(type: string) {
        const handler = m.get(type);
        switch (type) {
            case 'error':
                handler('test error');
                break;
            case 'unplayable':
                handler('test video id');
                break;
            case 'timeupdate':
                handler(1);
                break;
            case 'playbackQualityChange':
                handler(PlaybackQuality.Medium);
                break;
            case 'playbackRateChange':
                handler(0.75);
                break;
            default:
                handler();
        }
    }
}
